-- BULK RANDOM DATA GENERATION (AADHAR, VACCINE, SLOTS)
DELIMITER $$
CREATE PROCEDURE sp_generate_random_aadhar_data(IN total INT)
BEGIN
  DECLARE i INT DEFAULT 1;
  DECLARE max_city INT;
  DECLARE max_state INT;
  SELECT MAX(city_id) INTO max_city FROM city_master;
  SELECT MAX(state_id) INTO max_state FROM state_master;

  WHILE i <= total DO
    SET @fn = CONCAT('UserF_', FLOOR(RAND() * 100000));
    SET @ln = CONCAT('UserL_', FLOOR(RAND() * 100000));
    SET @gender = ELT(FLOOR(RAND()*3)+1, 'Male', 'Female', 'Other');
    SET @dob = DATE_ADD('1950-01-01', INTERVAL FLOOR(RAND()*21800) DAY);
    SET @mob = CONCAT('9', FLOOR(100000000 + RAND()*899999999));
    SET @email = CONCAT(@fn, '.', @ln, '@example.com');
    SET @addr = CONCAT('Addr_', FLOOR(RAND()*999));
    SET @cid = FLOOR(1 + RAND() * max_city);
    SET @sid = FLOOR(1 + RAND() * max_state);
    SET @pref = JSON_OBJECT('newsletter', IF(RAND() > 0.5, true, false), 'lang', ELT(FLOOR(RAND()*3)+1, 'en', 'hi', 'ta'));

    -- INSERT INTO aadhar_users (first_name, last_name, dob, gender, mobile_number, email_id, address, aadhar_number, city_id, state_id, preferences)
    call sp_create_aadhar_user(@fn, @ln, @dob, @gender, @mob, @email, @addr, '000000000000', @cid, @sid, @pref);

    SET @id = LAST_INSERT_ID();
    UPDATE aadhar_users SET aadhar_number = LPAD(@id, 12, '0') WHERE tid = @id;

    IF RAND() < 0.8 THEN
      SET @d1 = DATE_ADD('2021-01-01', INTERVAL FLOOR(RAND()*730) DAY);
      IF RAND() < 0.6 THEN
        SET @d2 = DATE_ADD(@d1, INTERVAL FLOOR(30 + RAND()*90) DAY);
      ELSE
        SET @d2 = NULL;
      END IF;
      INSERT INTO vaccination VALUES (@id, @d1, @d2);
    END IF;

    SET i = i + 1;
  END WHILE;
END $$
DELIMITER ;
call sp_generate_random_aadhar_data(100);