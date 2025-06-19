const express = require('express');
const router = express.Router();
const ctrl = require('./dashboard-ctrl');

// City-wise Aadhar Count
router.get('/city_wise_count', ctrl.cityWiseCount);

// State-wise Aadhar Count
router.get('/state_wise_count', ctrl.stateWiseCount);

// State-City-wise Aadhar Count
router.get('/state_city_wise_count', ctrl.stateCityWiseCount);

// Count of People Aged > 60
router.get('/count_above_60', ctrl.countAbove60);

// State-wise Count of People Aged > 60
router.get('/state_wise_above_60', ctrl.stateWiseAbove60);

// Aadhar Count by Age Categories
router.get('/age_category_counts', ctrl.ageCategoryCounts);

// Percentage Aged <20
router.get('/percentage_below_20', ctrl.percentageBelow20);

// State-wise Aadhar Holder Percentage
router.get('/state_wise_percentage', ctrl.stateWisePercentage);

// State-wise % of People Aged > 60
router.get('/state_wise_percentage_above_60', ctrl.stateWisePercentageAbove60);

// People with Only One Vaccine Dose
router.get('/one_dose_count', ctrl.oneDoseCount);

// People with Two Vaccine Doses
router.get('/two_dose_count', ctrl.twoDoseCount);

// % with Two Doses vs One Dose
router.get('/percentage_two_vs_one', ctrl.percentageTwoVsOne);

// % Not Vaccinated at All
router.get('/percentage_not_vaccinated', ctrl.percentageNotVaccinated);

// State-wise % with Only One Dose
router.get('/state_wise_one_dose', ctrl.stateWiseOneDose);

// State-wise % Not Vaccinated
router.get('/state_wise_not_vaccinated', ctrl.stateWiseNotVaccinated);

// List Not Vaccinated Users by State
router.get('/not_vaccinated_by_state/:state', ctrl.notVaccinatedByState);

// % Not Vaccinated by State Over National Total
router.get('/state_wise_not_vaccinated_overall', ctrl.stateWiseNotVaccinatedOverall);

// Gender-wise Aadhar Count
router.get('/gender_count', ctrl.genderCount);

// State and Gender-wise Aadhar Count
router.get('/state_gender_count', ctrl.stateGenderCount);

// State-wise Gender Distribution Percentage
router.get('/state_gender_percentage', ctrl.stateGenderPercentage);

// State Gender Comparison wrt Country Gender
router.get('/state_gender_comparison', ctrl.stateGenderComparison);

// Gender-wise Vaccinated with Both Doses
router.get('/vaccinated_both_doses_by_gender', ctrl.vaccinatedBothDosesByGender);

// State and Gender-wise Vaccination Ratio
router.get('/state_gender_vaccination_ratio', ctrl.stateGenderVaccinationRatio);

// Get all Aadhaar data
router.get('/all_aadhar_data', ctrl.allAadharData);

module.exports = router;