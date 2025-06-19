const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const ctrl = require('./reg-ctrl');

router.post('/insert_aadhar', ctrl.insertAadhar);
router.post('/update_profile_picture', upload.single('profile'), ctrl.updateProfilePicture);
router.post('/generate_random_data', ctrl.generateRandomAadharData);

module.exports = router;