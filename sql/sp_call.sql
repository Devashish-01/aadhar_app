-- TASK 2: City-wise Aadhar Holder Count
DELIMITER $$
CREATE PROCEDURE sp_city_aadhar_count()
BEGIN
  SELECT cm.city_name, COUNT(*) AS aadhar_count
  FROM aadhar_users au
  JOIN city_master cm ON au.city_id = cm.city_id
  GROUP BY cm.city_name;
END $$
DELIMITER ;
call sp_city_aadhar_count();

-- TASK 3: State-wise Aadhar Holder Count
DELIMITER $$
CREATE PROCEDURE sp_state_aadhar_count()
BEGIN
  SELECT sm.state_name, COUNT(*) AS aadhar_count
  FROM aadhar_users au
  JOIN state_master sm ON au.state_id = sm.state_id
  GROUP BY sm.state_name;
END $$
DELIMITER ;
call sp_state_aadhar_count();

-- TASK 4: State-City-wise Aadhar Holder Count
DELIMITER $$
CREATE PROCEDURE sp_state_city_aadhar_count()
BEGIN
  SELECT sm.state_name, cm.city_name, COUNT(*) AS aadhar_count
  FROM aadhar_users au
  JOIN city_master cm ON au.city_id = cm.city_id
  JOIN state_master sm ON au.state_id = sm.state_id
  GROUP BY sm.state_name, cm.city_name;
END $$
DELIMITER ;
call sp_state_city_aadhar_count();

-- TASK 5: Count of People Aged > 60
DELIMITER $$
CREATE PROCEDURE sp_count_age_above_60()
BEGIN
  SELECT COUNT(*) AS count_above_60
  FROM aadhar_users
  WHERE FLOOR(DATEDIFF(CURDATE(), dob)/365.25) > 60;
END $$
DELIMITER ;
call sp_count_age_above_60();

-- TASK 6: State-wise Count of People Aged > 60
DELIMITER $$
CREATE PROCEDURE sp_state_count_age_above_60()
BEGIN
  SELECT sm.state_name, COUNT(*) AS count_above_60
  FROM aadhar_users au
  JOIN state_master sm ON au.state_id = sm.state_id
  WHERE FLOOR(DATEDIFF(CURDATE(), dob)/365.25) > 60
  GROUP BY sm.state_name;
END $$
DELIMITER ;
call sp_state_count_age_above_60();

-- TASK 7: Aadhar Count by Age Categories
DELIMITER $$
CREATE PROCEDURE sp_age_category_counts()
BEGIN
  SELECT '<10' AS age_category, COUNT(*) AS aadhar_count FROM aadhar_users WHERE FLOOR(DATEDIFF(CURDATE(), dob)/365.25) < 10
  UNION ALL
  SELECT '10-20', COUNT(*) FROM aadhar_users WHERE FLOOR(DATEDIFF(CURDATE(), dob)/365.25) BETWEEN 10 AND 20
  UNION ALL
  SELECT '20-60', COUNT(*) FROM aadhar_users WHERE FLOOR(DATEDIFF(CURDATE(), dob)/365.25) BETWEEN 21 AND 60
  UNION ALL
  SELECT '>60', COUNT(*) FROM aadhar_users WHERE FLOOR(DATEDIFF(CURDATE(), dob)/365.25) > 60;
END $$
DELIMITER ;
call sp_age_category_counts();

-- TASK 8: Percentage Aged <20
DELIMITER $$
CREATE PROCEDURE sp_percentage_below_20()
BEGIN
  SELECT ROUND(
    (SELECT COUNT(*) FROM aadhar_users WHERE FLOOR(DATEDIFF(CURDATE(), dob)/365.25) < 20) /
    NULLIF((SELECT COUNT(*) FROM aadhar_users), 0) * 100, 2
  ) AS pct_below_20;
END $$
DELIMITER ;
call sp_percentage_below_20();

-- TASK 9: State-wise Aadhar Holder Percentage
DELIMITER $$
CREATE PROCEDURE sp_statewise_percentage_total()
BEGIN
  SELECT sm.state_name, COUNT(*) AS state_count,
         (SELECT COUNT(*) FROM aadhar_users) AS total_count,
         ROUND(COUNT(*) / NULLIF((SELECT COUNT(*) FROM aadhar_users), 0) * 100, 2) AS percentage
  FROM aadhar_users au
  JOIN state_master sm ON au.state_id = sm.state_id
  GROUP BY sm.state_name;
END $$
DELIMITER ;
call sp_statewise_percentage_total();

-- TASK 10: State-wise % of People Aged > 60 from National Total Aged > 60
DELIMITER $$
CREATE PROCEDURE sp_statewise_percentage_above_60()
BEGIN
  SELECT sm.state_name,
         COUNT(*) AS state_above_60,
         (SELECT COUNT(*) FROM aadhar_users WHERE FLOOR(DATEDIFF(CURDATE(), dob)/365.25) > 60) AS total_above_60,
         ROUND(COUNT(*) / NULLIF((SELECT COUNT(*) FROM aadhar_users WHERE FLOOR(DATEDIFF(CURDATE(), dob)/365.25) > 60), 0) * 100, 2) AS percentage
  FROM aadhar_users au
  JOIN state_master sm ON au.state_id = sm.state_id
  WHERE FLOOR(DATEDIFF(CURDATE(), dob)/365.25) > 60
  GROUP BY sm.state_name;
END $$
DELIMITER ;
call sp_statewise_percentage_above_60();

-- TASK 11: People with Only One Vaccine Dose
DELIMITER $$
CREATE PROCEDURE sp_vac_one_dose_count()
BEGIN
  SELECT COUNT(*) AS one_dose_count
  FROM vaccination
  WHERE dose1_date IS NOT NULL AND dose2_date IS NULL;
END $$
DELIMITER ;

call sp_vac_one_dose_count();

-- TASK 12: People with Two Vaccine Doses
DELIMITER $$
CREATE PROCEDURE sp_vac_two_dose_count()
BEGIN
  SELECT COUNT(*) AS two_dose_count
  FROM vaccination
  WHERE dose1_date IS NOT NULL AND dose2_date IS NOT NULL;
END $$
DELIMITER ;
call sp_vac_two_dose_count();

-- TASK 13: % with Two Doses vs One Dose
DELIMITER $$
CREATE PROCEDURE sp_vac_pct_two_vs_one()
BEGIN
  SELECT ROUND(
    (SELECT COUNT(*) FROM vaccination WHERE dose2_date IS NOT NULL) /
    NULLIF((SELECT COUNT(*) FROM vaccination WHERE dose1_date IS NOT NULL AND dose2_date IS NULL), 0) * 100, 2
  ) AS pct_two_vs_one;
END $$
DELIMITER ;
call sp_vac_pct_two_vs_one();

-- TASK 14: % Not Vaccinated at All
DELIMITER $$
CREATE PROCEDURE sp_vac_pct_not_vaccinated()
BEGIN
  SELECT ROUND(
    (SELECT COUNT(*) FROM aadhar_users au LEFT JOIN vaccination v ON au.tid = v.tid
     WHERE v.tid IS NULL OR v.dose1_date IS NULL)
    / NULLIF((SELECT COUNT(*) FROM aadhar_users), 0) * 100, 2
  ) AS pct_not_vaccinated;
END $$
DELIMITER ;
call sp_vac_pct_not_vaccinated();

-- TASK 15: State-wise % with Only One Dose
DELIMITER $$
CREATE PROCEDURE sp_statewise_pct_one_dose_only()
BEGIN
  SELECT sm.state_name,
         COUNT(*) AS one_dose_count,
         (SELECT COUNT(*) FROM aadhar_users WHERE state_id = sm.state_id) AS total_state_count,
         ROUND(COUNT(*) / NULLIF((SELECT COUNT(*) FROM aadhar_users WHERE state_id = sm.state_id), 0) * 100, 2) AS percentage
  FROM aadhar_users au
  JOIN vaccination v ON au.tid = v.tid
  JOIN state_master sm ON au.state_id = sm.state_id
  WHERE v.dose1_date IS NOT NULL AND v.dose2_date IS NULL
  GROUP BY sm.state_name;
END $$
DELIMITER ;
call sp_statewise_pct_one_dose_only();

-- TASK 16: State-wise % Not Vaccinated
DELIMITER $$
CREATE PROCEDURE sp_statewise_pct_not_vaccinated()
BEGIN
  SELECT sm.state_name,
         COUNT(*) AS not_vaccinated_count,
         (SELECT COUNT(*) FROM aadhar_users WHERE state_id = sm.state_id) AS total_state_count,
         ROUND(COUNT(*) / NULLIF((SELECT COUNT(*) FROM aadhar_users WHERE state_id = sm.state_id), 0) * 100, 2) AS percentage
  FROM aadhar_users au
  LEFT JOIN vaccination v ON au.tid = v.tid
  JOIN state_master sm ON au.state_id = sm.state_id
  WHERE v.tid IS NULL OR v.dose1_date IS NULL
  GROUP BY sm.state_name;
END $$
DELIMITER ;
call sp_statewise_pct_not_vaccinated();

-- TASK 17: List Not Vaccinated Users by State
DELIMITER $$
CREATE PROCEDURE sp_list_not_vaccinated_by_state(IN p_state_name VARCHAR(100))
BEGIN
  SELECT au.tid, CONCAT(au.first_name, ' ', au.last_name) AS name, au.email_id
  FROM aadhar_users au
  LEFT JOIN vaccination v ON au.tid = v.tid
  JOIN state_master sm ON au.state_id = sm.state_id
  WHERE sm.state_name = p_state_name AND (v.tid IS NULL OR v.dose1_date IS NULL);
END $$
DELIMITER ;
call sp_list_not_vaccinated_by_state('Delhi');

-- TASK 18: % Not Vaccinated by State Over National Total
DELIMITER $$
CREATE PROCEDURE sp_statewise_pct_not_vacc_overall()
BEGIN
  SELECT sm.state_name,
         COUNT(*) AS not_vaccinated_in_state,
         (SELECT COUNT(*) FROM aadhar_users au LEFT JOIN vaccination v ON au.tid = v.tid
          WHERE v.tid IS NULL OR v.dose1_date IS NULL) AS total_not_vaccinated,
         ROUND(COUNT(*) / NULLIF((SELECT COUNT(*) FROM aadhar_users au LEFT JOIN vaccination v ON au.tid = v.tid
                                  WHERE v.tid IS NULL OR v.dose1_date IS NULL), 0) * 100, 2) AS percentage
  FROM aadhar_users au
  LEFT JOIN vaccination v ON au.tid = v.tid
  JOIN state_master sm ON au.state_id = sm.state_id
  WHERE v.tid IS NULL OR v.dose1_date IS NULL
  GROUP BY sm.state_name;
END $$
DELIMITER ;
call sp_statewise_pct_not_vacc_overall();

-- TASK 19: Gender-wise Aadhar Count
DELIMITER $$
CREATE PROCEDURE sp_gender_count()
BEGIN
  SELECT gender, COUNT(*) AS user_count FROM aadhar_users GROUP BY gender;
END $$
DELIMITER ;
call sp_gender_count();

-- TASK 20: State and Gender-wise Aadhar Count
DELIMITER $$
CREATE PROCEDURE sp_state_gender_count()
BEGIN
  SELECT sm.state_name, au.gender, COUNT(*) AS user_count
  FROM aadhar_users au
  JOIN state_master sm ON au.state_id = sm.state_id
  GROUP BY sm.state_name, au.gender;
END $$
DELIMITER ;
call sp_state_gender_count();

-- TASK 21: State-wise Gender Distribution Percentage
DELIMITER $$
CREATE PROCEDURE sp_state_gender_percentage()
BEGIN
  SELECT sm.state_name, au.gender, COUNT(*) AS gender_count,
         (SELECT COUNT(*) FROM aadhar_users WHERE state_id = sm.state_id) AS total_state_count,
         ROUND(COUNT(*) / NULLIF((SELECT COUNT(*) FROM aadhar_users WHERE state_id = sm.state_id), 0) * 100, 2) AS percentage
  FROM aadhar_users au
  JOIN state_master sm ON au.state_id = sm.state_id
  GROUP BY sm.state_name, au.gender;
END $$
DELIMITER ;
call sp_state_gender_percentage();

-- TASK 22: State Gender Comparison wrt Country Gender
DELIMITER $$
CREATE PROCEDURE sp_state_gender_comparison()
BEGIN
  SELECT sm.state_name, au.gender, COUNT(*) AS state_gender_count,
         (SELECT COUNT(*) FROM aadhar_users WHERE gender = au.gender) AS country_gender_count,
         ROUND(COUNT(*) / NULLIF((SELECT COUNT(*) FROM aadhar_users WHERE gender = au.gender), 0) * 100, 2) AS percentage
  FROM aadhar_users au
  JOIN state_master sm ON au.state_id = sm.state_id
  GROUP BY sm.state_name, au.gender;
END $$
DELIMITER ;
call sp_state_gender_comparison();

-- TASK 23: Gender-wise Vaccinated with Both Doses
DELIMITER $$
CREATE PROCEDURE sp_vaccinated_both_doses_by_gender()
BEGIN
  SELECT au.gender, COUNT(*) AS vaccinated_count,
         (SELECT COUNT(*) FROM aadhar_users WHERE gender = au.gender) AS total_gender,
         ROUND(COUNT(*) / NULLIF((SELECT COUNT(*) FROM aadhar_users WHERE gender = au.gender), 0) * 100, 2) AS percentage
  FROM aadhar_users au
  JOIN vaccination v ON au.tid = v.tid
  WHERE v.dose1_date IS NOT NULL AND v.dose2_date IS NOT NULL
  GROUP BY au.gender;
END $$
DELIMITER ;
call sp_vaccinated_both_doses_by_gender();

-- TASK 24: State and Gender-wise Vaccination Ratio
DELIMITER $$
CREATE PROCEDURE sp_state_gender_vaccination_ratio()
BEGIN
  SELECT sm.state_name, au.gender, COUNT(*) AS vaccinated_count,
         (SELECT COUNT(*) FROM aadhar_users WHERE state_id = sm.state_id AND gender = au.gender) AS total_in_state,
         ROUND(COUNT(*) / NULLIF((SELECT COUNT(*) FROM aadhar_users WHERE state_id = sm.state_id AND gender = au.gender), 0) * 100, 2) AS percentage
  FROM aadhar_users au
  JOIN vaccination v ON au.tid = v.tid
  JOIN state_master sm ON au.state_id = sm.state_id
  WHERE v.dose1_date IS NOT NULL AND v.dose2_date IS NOT NULL
  GROUP BY sm.state_name, au.gender;
END $$
DELIMITER ;
call sp_state_gender_vaccination_ratio();