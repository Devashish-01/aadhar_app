const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { insertAadhar, updateProfilePicture, generateRandomAadharData } = require('./reg-ctrl');

router.post('/insert_aadhar', insertAadhar);
router.post('/update_profile_picture', upload.single('profile'), updateProfilePicture);
router.post('/generate_random_data', generateRandomAadharData);

module.exports = router;