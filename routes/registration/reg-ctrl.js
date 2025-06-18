const db = require('../../db');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

exports.insertAadhar = async (req, res) => {
  try {
    const {
      first_name, last_name, dob, gender,
      mobile_number, email_id, address,
      city_id, state_id, preferences
    } = req.body;

    // Validate date format
    if (!dob || !isValidDate(dob)) {
      return res.status(400).json({ error: "Invalid date format. Please use YYYY-MM-DD format" });
    }

    // Call stored procedure with OUT parameter
    const [resultSets] = await db.query(
      "CALL sp_create_aadhar_user(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @aadhar_number)",
      [
        first_name, last_name, dob, gender,
        mobile_number, email_id, address,
        city_id, state_id,
        JSON.stringify(preferences || {})
      ]
    );

    // Get the generated Aadhaar number
    const [aadharResult] = await db.query("SELECT @aadhar_number as aadhar_number");
    const aadhar_number = aadharResult[0].aadhar_number;

    res.status(201).json({ 
      message: "Aadhar inserted successfully", 
      aadhar_number: aadhar_number
    });
  } catch (err) {
    console.error(err);
    if (err.code === 'ER_SIGNAL_EXCEPTION') {
      res.status(400).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Server error" });
    }
  }
};

// Helper function to validate date format
function isValidDate(dateString) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;
  
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
}

exports.updateProfilePicture = async (req, res) => {
  try {
    const { tid } = req.body;
    const image = req.file;

    // Validate input
    if (!tid) {
      return res.status(400).json({ error: "User ID (tid) is required" });
    }
    if (!image) {
      return res.status(400).json({ error: "No image file provided" });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(image.mimetype)) {
      return res.status(400).json({ error: "Only JPEG, JPG and PNG files are allowed" });
    }

    // Generate unique filename
    const ext = path.extname(image.originalname) || '.png';
    const fileName = uuidv4() + ext;
    const filePath = path.join('uploads', fileName);
    const fullPath = path.join(__dirname, '../../', filePath);

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(__dirname, '../../uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Move the file
    fs.renameSync(image.path, fullPath);

    // Update profile picture in database
    const [result] = await db.query(
      "CALL sp_update_profile_picture(?, ?)",
      [tid, filePath]
    );

    // Delete old profile picture if exists
    const oldPicture = result[0][0]?.old_picture;
    if (oldPicture) {
      const oldPath = path.join(__dirname, '../../', oldPicture);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    res.json({ 
      message: "Profile picture updated successfully",
      path: filePath
    });
  } catch (err) {
    console.error(err);
    if (err.code === 'ER_SIGNAL_EXCEPTION') {
      res.status(400).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Server error" });
    }
  }
};

exports.generateRandomAadharData = async (req, res) => {
  try {
    const count = parseInt(req.body?.count); // no default

    if (!count || isNaN(count) || count < 1 || count > 1000) {
      return res.status(400).json({
        error: "Invalid count. Please provide a number between 1 and 1000"
      });
    }


    // Call the stored procedure
    await db.query("CALL sp_generate_random_aadhar_data(?)", [count]);

    res.json({ 
      message: `Successfully generated ${count} random Aadhaar records`,
      count: count
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};