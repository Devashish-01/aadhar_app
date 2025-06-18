const express = require('express');
const router = express.Router();

router.use('/dashboard', require('./dashboard/dashboard-routes'));
router.use('/registration', require('./registration/reg-routes'));


module.exports = router;