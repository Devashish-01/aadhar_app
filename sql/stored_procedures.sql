DELIMITER $$

-- TASK 1: Insert Aadhar User with Validation
DELIMITER $$
CREATE PROCEDURE sp_create_aadhar_user(
  IN p_first_name VARCHAR(100),
  IN p_last_name VARCHAR(100),
  IN p_dob DATE,
  IN p_gender VARCHAR(10),
  IN p_mobile VARCHAR(15),
  IN p_email VARCHAR(255),
  IN p_address TEXT,
  IN p_city_id BIGINT,
  IN p_state_id BIGINT,
  IN p_preferences JSON,
  out o_aadhar_number varchar(12)
)
BEGIN
  DECLARE v_today DATE;
  DECLARE v_len INT;
  DECLARE v_new_tid BIGINT;
  declare v_generated_aadhar varchar(12);
  declare v_profile_picture varchar(255);
  set v_profile_picture = "";

  SET v_today = CURDATE();
  SET v_len = CHAR_LENGTH(p_first_name);

  IF v_len = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'First name is mandatory';
  END IF;
  IF v_len > 40 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'First name cannot exceed 40 characters';
  END IF;
  IF p_mobile IS NULL OR LENGTH(p_mobile) = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Mobile number is mandatory';
  END IF;
  IF p_email IS NULL OR LENGTH(p_email) = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Email is mandatory';
  END IF;
  IF p_dob IS NULL THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'DOB is mandatory';
  END IF;
  IF p_dob > v_today THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid date: DOB cannot be in the future';
  END IF;

  INSERT INTO aadhar_users (
    first_name, last_name, dob, gender, mobile_number, email_id, address,
    aadhar_number, city_id, state_id, preferences, profile_picture
  ) VALUES (
    p_first_name, p_last_name, p_dob, p_gender, p_mobile, p_email, p_address,
    '000000000000', p_city_id, p_state_id, p_preferences, v_profile_picture
  );
   
  SET v_new_tid = LAST_INSERT_ID();
  set v_generated_aadhar =  LPAD(CAST(v_new_tid AS CHAR), 12, '0');
  UPDATE aadhar_users
  SET aadhar_number = v_generated_aadhar
  WHERE tid = v_new_tid;
  SET o_aadhar_number = v_generated_aadhar;
END $$
DELIMITER ;

-- Procedure to update profile picture
CREATE PROCEDURE sp_update_profile_picture(
  IN p_tid BIGINT,
  IN p_profile_picture VARCHAR(255)
)
BEGIN
  DECLARE v_user_exists INT;
  DECLARE v_old_picture VARCHAR(255);

  -- Check if user exists and get old picture
  SELECT profile_picture INTO v_old_picture 
  FROM aadhar_users 
  WHERE tid = p_tid;

  -- Set user exists based on whether we found a profile_picture
  SET v_user_exists = IF(v_old_picture IS NOT NULL, 1, 0);

  IF v_user_exists = 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'User not found';
  END IF;

  -- Update profile picture
  UPDATE aadhar_users
  SET 
    profile_picture = p_profile_picture,
    updated_date = CURRENT_TIMESTAMP
  WHERE tid = p_tid;

  -- Return old picture path for cleanup
  SELECT v_old_picture as old_picture;
END $$

-- Procedure to get state-wise count of users above 60
CREATE PROCEDURE sp_state_count_age_above_60()
BEGIN
    SELECT 
        s.state_name,
        COUNT(*) as user_count
    FROM aadhar_users a
    JOIN state_master s ON a.state_id = s.state_id
    WHERE TIMESTAMPDIFF(YEAR, a.dob, CURDATE()) > 60
    GROUP BY s.state_id, s.state_name;
END $$

-- Procedure to get state-city wise user count
CREATE PROCEDURE sp_state_city_aadhar_count()
BEGIN
    SELECT 
        s.state_name,
        c.city_name,
        COUNT(*) as user_count
    FROM aadhar_users a
    JOIN state_master s ON a.state_id = s.state_id
    JOIN city_master c ON a.city_id = c.city_id
    GROUP BY s.state_id, s.state_name, c.city_id, c.city_name;
END $$

DELIMITER ; 