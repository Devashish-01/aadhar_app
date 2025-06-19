DELIMITER //

CREATE PROCEDURE sp_get_all_aadhar_data()
BEGIN
    SELECT 
        a.*,
        c.city_name,
        s.state_name
    FROM aadhar_users a
    LEFT JOIN city_master c ON a.city_id = c.city_id
    LEFT JOIN state s_master ON a.state_id = s.state_id
    ORDER BY a.tid DESC;
END //

DELIMITER ; 