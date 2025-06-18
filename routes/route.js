const express = require('express');
const router = express.Router();

router.use('/', require('./registration/reg-routes'));
router.use('/', require('./dashboard/dashboard-routes'));

module.exports = router;