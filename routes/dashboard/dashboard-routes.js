const express = require('express');
const router = express.Router();
const db = require('../../db');

// /state_wise_adhar_count_above_60
router.get('/state_wise_adhar_count_above_60', async (req, res) => {
  try {
    const [resultSets] = await db.query("CALL sp_state_count_age_above_60()");
    res.json(resultSets[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// /state_city_wise_adhar_users
router.get('/state_city_wise_adhar_users', async (req, res) => {
  try {
    const [resultSets] = await db.query("CALL sp_state_city_aadhar_count()");
    res.json(resultSets[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;