const express = require('express');
const router = express.Router();

// Mount dashboard routes under /dashboard
router.use('/registration', require('./registration/reg-routes'));
router.use('/dashboard', require('./dashboard/dashboard-routes'));

// Mount registration routes under /registration

module.exports = router;