const db = require('../../db');

exports.cityWiseCount = async (req, res) => {
  try {
    const [resultSets] = await db.query("CALL sp_city_aadhar_count()");
    res.json(resultSets[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.stateWiseCount = async (req, res) => {
  try {
    const [resultSets] = await db.query("CALL sp_state_aadhar_count()");
    res.json(resultSets[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.stateCityWiseCount = async (req, res) => {
  try {
    const [resultSets] = await db.query("CALL sp_state_city_aadhar_count()");
    res.json(resultSets[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.countAbove60 = async (req, res) => {
  try {
    const [resultSets] = await db.query("CALL sp_count_age_above_60()");
    res.json(resultSets[0][0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.stateWiseAbove60 = async (req, res) => {
  try {
    const [resultSets] = await db.query("CALL sp_state_count_age_above_60()");
    res.json(resultSets[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.ageCategoryCounts = async (req, res) => {
  try {
    const [resultSets] = await db.query("CALL sp_age_category_counts()");
    res.json(resultSets[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.percentageBelow20 = async (req, res) => {
  try {
    const [resultSets] = await db.query("CALL sp_percentage_below_20()");
    res.json(resultSets[0][0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.stateWisePercentage = async (req, res) => {
  try {
    const [resultSets] = await db.query("CALL sp_statewise_percentage_total()");
    res.json(resultSets[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.stateWisePercentageAbove60 = async (req, res) => {
  try {
    const [resultSets] = await db.query("CALL sp_statewise_percentage_above_60()");
    res.json(resultSets[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.oneDoseCount = async (req, res) => {
  try {
    const [resultSets] = await db.query("CALL sp_vac_one_dose_count()");
    res.json(resultSets[0][0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.twoDoseCount = async (req, res) => {
  try {
    const [resultSets] = await db.query("CALL sp_vac_two_dose_count()");
    res.json(resultSets[0][0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.percentageTwoVsOne = async (req, res) => {
  try {
    const [resultSets] = await db.query("CALL sp_vac_pct_two_vs_one()");
    res.json(resultSets[0][0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.percentageNotVaccinated = async (req, res) => {
  try {
    const [resultSets] = await db.query("CALL sp_vac_pct_not_vaccinated()");
    res.json(resultSets[0][0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.stateWiseOneDose = async (req, res) => {
  try {
    const [resultSets] = await db.query("CALL sp_statewise_pct_one_dose_only()");
    res.json(resultSets[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.stateWiseNotVaccinated = async (req, res) => {
  try {
    const [resultSets] = await db.query("CALL sp_statewise_pct_not_vaccinated()");
    res.json(resultSets[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.notVaccinatedByState = async (req, res) => {
  try {
    const [resultSets] = await db.query("CALL sp_list_not_vaccinated_by_state(?)", [req.params.state]);
    res.json(resultSets[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.stateWiseNotVaccinatedOverall = async (req, res) => {
  try {
    const [resultSets] = await db.query("CALL sp_statewise_pct_not_vacc_overall()");
    res.json(resultSets[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.genderCount = async (req, res) => {
  try {
    const [resultSets] = await db.query("CALL sp_gender_count()");
    res.json(resultSets[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.stateGenderCount = async (req, res) => {
  try {
    const [resultSets] = await db.query("CALL sp_state_gender_count()");
    res.json(resultSets[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.stateGenderPercentage = async (req, res) => {
  try {
    const [resultSets] = await db.query("CALL sp_state_gender_percentage()");
    res.json(resultSets[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.stateGenderComparison = async (req, res) => {
  try {
    const [resultSets] = await db.query("CALL sp_state_gender_comparison()");
    res.json(resultSets[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.vaccinatedBothDosesByGender = async (req, res) => {
  try {
    const [resultSets] = await db.query("CALL sp_vaccinated_both_doses_by_gender()");
    res.json(resultSets[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.stateGenderVaccinationRatio = async (req, res) => {
  try {
    const [resultSets] = await db.query("CALL sp_state_gender_vaccination_ratio()");
    res.json(resultSets[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.allAadharData = async (req, res) => {
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
}; 