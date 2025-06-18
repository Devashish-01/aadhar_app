const express = require('express');
const router = express.Router();
const db = require('../../db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// City-wise Aadhar Count
router.get('/city_wise_count', async (req, res) => {
  try {
    const [resultSets] = await db.query("CALL sp_city_aadhar_count()");
    res.json(resultSets[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// State-wise Aadhar Count
router.get('/state_wise_count', async (req, res) => {
  try {
    const [resultSets] = await db.query("CALL sp_state_aadhar_count()");
    res.json(resultSets[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// State-City-wise Aadhar Count
router.get('/state_city_wise_count', async (req, res) => {
  try {
    const [resultSets] = await db.query("CALL sp_state_city_aadhar_count()");
    res.json(resultSets[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Count of People Aged > 60
router.get('/count_above_60', async (req, res) => {
  try {
    const [resultSets] = await db.query("CALL sp_count_age_above_60()");
    res.json(resultSets[0][0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// State-wise Count of People Aged > 60
router.get('/state_wise_above_60', async (req, res) => {
  try {
    const [resultSets] = await db.query("CALL sp_state_count_age_above_60()");
    res.json(resultSets[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Aadhar Count by Age Categories
router.get('/age_category_counts', async (req, res) => {
  try {
    const [resultSets] = await db.query("CALL sp_age_category_counts()");
    res.json(resultSets[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Percentage Aged <20
router.get('/percentage_below_20', async (req, res) => {
  try {
    const [resultSets] = await db.query("CALL sp_percentage_below_20()");
    res.json(resultSets[0][0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// State-wise Aadhar Holder Percentage
router.get('/state_wise_percentage', async (req, res) => {
  try {
    const [resultSets] = await db.query("CALL sp_statewise_percentage_total()");
    res.json(resultSets[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// State-wise % of People Aged > 60
router.get('/state_wise_percentage_above_60', async (req, res) => {
  try {
    const [resultSets] = await db.query("CALL sp_statewise_percentage_above_60()");
    res.json(resultSets[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// People with Only One Vaccine Dose
router.get('/one_dose_count', async (req, res) => {
  try {
    const [resultSets] = await db.query("CALL sp_vac_one_dose_count()");
    res.json(resultSets[0][0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// People with Two Vaccine Doses
router.get('/two_dose_count', async (req, res) => {
  try {
    const [resultSets] = await db.query("CALL sp_vac_two_dose_count()");
    res.json(resultSets[0][0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// % with Two Doses vs One Dose
router.get('/percentage_two_vs_one', async (req, res) => {
  try {
    const [resultSets] = await db.query("CALL sp_vac_pct_two_vs_one()");
    res.json(resultSets[0][0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// % Not Vaccinated at All
router.get('/percentage_not_vaccinated', async (req, res) => {
  try {
    const [resultSets] = await db.query("CALL sp_vac_pct_not_vaccinated()");
    res.json(resultSets[0][0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// State-wise % with Only One Dose
router.get('/state_wise_one_dose', async (req, res) => {
  try {
    const [resultSets] = await db.query("CALL sp_statewise_pct_one_dose_only()");
    res.json(resultSets[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// State-wise % Not Vaccinated
router.get('/state_wise_not_vaccinated', async (req, res) => {
  try {
    const [resultSets] = await db.query("CALL sp_statewise_pct_not_vaccinated()");
    res.json(resultSets[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// List Not Vaccinated Users by State
router.get('/not_vaccinated_by_state/:state', async (req, res) => {
  try {
    const [resultSets] = await db.query("CALL sp_list_not_vaccinated_by_state(?)", [req.params.state]);
    res.json(resultSets[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// % Not Vaccinated by State Over National Total
router.get('/state_wise_not_vaccinated_overall', async (req, res) => {
  try {
    const [resultSets] = await db.query("CALL sp_statewise_pct_not_vacc_overall()");
    res.json(resultSets[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Gender-wise Aadhar Count
router.get('/gender_count', async (req, res) => {
  try {
    const [resultSets] = await db.query("CALL sp_gender_count()");
    res.json(resultSets[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// State and Gender-wise Aadhar Count
router.get('/state_gender_count', async (req, res) => {
  try {
    const [resultSets] = await db.query("CALL sp_state_gender_count()");
    res.json(resultSets[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// State-wise Gender Distribution Percentage
router.get('/state_gender_percentage', async (req, res) => {
  try {
    const [resultSets] = await db.query("CALL sp_state_gender_percentage()");
    res.json(resultSets[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// State Gender Comparison wrt Country Gender
router.get('/state_gender_comparison', async (req, res) => {
  try {
    const [resultSets] = await db.query("CALL sp_state_gender_comparison()");
    res.json(resultSets[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Gender-wise Vaccinated with Both Doses
router.get('/vaccinated_both_doses_by_gender', async (req, res) => {
  try {
    const [resultSets] = await db.query("CALL sp_vaccinated_both_doses_by_gender()");
    res.json(resultSets[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// State and Gender-wise Vaccination Ratio
router.get('/state_gender_vaccination_ratio', async (req, res) => {
  try {
    const [resultSets] = await db.query("CALL sp_state_gender_vaccination_ratio()");
    res.json(resultSets[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get all Aadhaar data
router.get('/all_aadhar_data', async (req, res) => {
    try {
        const [results] = await db.query('CALL sp_get_all_aadhar_data()');
        
        res.json({
            success: true,
            count: results[0].length,
            data: results[0]
        });
    } catch (error) {
        console.error('Error fetching all Aadhaar data:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch Aadhaar data'
        });
    }
});

module.exports = router;