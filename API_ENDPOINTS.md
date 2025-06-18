# Aadhaar Application API Endpoints

## Base URL
- Development: `http://localhost:9000`

## Registration Endpoints

### 1. Insert Aadhaar User
- **URL**: `/registration/insert_aadhar`
- **Method**: `POST`
- **Description**: Register a new Aadhaar user
- **Request Body**: JSON object containing user details
  ```json
  {
    "first_name": "string",
    "last_name": "string",
    "dob": "YYYY-MM-DD",
    "gender": "string",
    "mobile_number": "string",
    "email_id": "string",
    "address": "string",
    "city_id": "number",
    "state_id": "number",
    "preferences": "json"
  }
  ```

### 2. Update Profile Picture
- **URL**: `/registration/update_profile_picture`
- **Method**: `POST`
- **Description**: Upload or update user's profile picture
- **Request Body**: Form-data
  - `profile`: Image file
  - `tid`: User ID (Aadhaar user's tid)

### 3. Generate Random Data
- **URL**: `/registration/generate_random_data`
- **Method**: `POST`
- **Description**: Generate random Aadhaar user data
- **Request Body**: JSON
  ```json
  {
    "count": "number" // Optional, defaults to 100
  }
  ```

## Dashboard Endpoints

### 1. City-wise Aadhar Count
- **URL**: `/dashboard/city_wise_count`
- **Method**: `GET`
- **Description**: Get count of Aadhaar users by city

### 2. State-wise Aadhar Count
- **URL**: `/dashboard/state_wise_count`
- **Method**: `GET`
- **Description**: Get count of Aadhaar users by state

### 3. State-City-wise Aadhar Count
- **URL**: `/dashboard/state_city_wise_count`
- **Method**: `GET`
- **Description**: Get count of Aadhaar users by state and city

### 4. Count of People Aged > 60
- **URL**: `/dashboard/count_above_60`
- **Method**: `GET`
- **Description**: Get total count of users above 60 years

### 5. State-wise Count of People Aged > 60
- **URL**: `/dashboard/state_wise_above_60`
- **Method**: `GET`
- **Description**: Get count of users above 60 years by state

### 6. Aadhar Count by Age Categories
- **URL**: `/dashboard/age_category_counts`
- **Method**: `GET`
- **Description**: Get count of users by age categories (<10, 10-20, 20-60, >60)

### 7. Percentage Aged <20
- **URL**: `/dashboard/percentage_below_20`
- **Method**: `GET`
- **Description**: Get percentage of users below 20 years

### 8. State-wise Aadhar Holder Percentage
- **URL**: `/dashboard/state_wise_percentage`
- **Method**: `GET`
- **Description**: Get percentage of Aadhaar holders by state

### 9. State-wise % of People Aged > 60
- **URL**: `/dashboard/state_wise_percentage_above_60`
- **Method**: `GET`
- **Description**: Get percentage of users above 60 years by state

### 10. People with Only One Vaccine Dose
- **URL**: `/dashboard/one_dose_count`
- **Method**: `GET`
- **Description**: Get count of users with only one vaccine dose

### 11. People with Two Vaccine Doses
- **URL**: `/dashboard/two_dose_count`
- **Method**: `GET`
- **Description**: Get count of users with both vaccine doses

### 12. % with Two Doses vs One Dose
- **URL**: `/dashboard/percentage_two_vs_one`
- **Method**: `GET`
- **Description**: Get percentage of users with two doses compared to one dose

### 13. % Not Vaccinated at All
- **URL**: `/dashboard/percentage_not_vaccinated`
- **Method**: `GET`
- **Description**: Get percentage of users not vaccinated

### 14. State-wise % with Only One Dose
- **URL**: `/dashboard/state_wise_one_dose`
- **Method**: `GET`
- **Description**: Get percentage of users with one dose by state

### 15. State-wise % Not Vaccinated
- **URL**: `/dashboard/state_wise_not_vaccinated`
- **Method**: `GET`
- **Description**: Get percentage of unvaccinated users by state

### 16. List Not Vaccinated Users by State
- **URL**: `/dashboard/not_vaccinated_by_state/:state`
- **Method**: `GET`
- **Description**: Get list of unvaccinated users in a specific state
- **URL Parameters**: 
  - `state`: State name

### 17. % Not Vaccinated by State Over National Total
- **URL**: `/dashboard/state_wise_not_vaccinated_overall`
- **Method**: `GET`
- **Description**: Get percentage of unvaccinated users by state compared to national total

### 18. Gender-wise Aadhar Count
- **URL**: `/dashboard/gender_count`
- **Method**: `GET`
- **Description**: Get count of users by gender

### 19. State and Gender-wise Aadhar Count
- **URL**: `/dashboard/state_gender_count`
- **Method**: `GET`
- **Description**: Get count of users by state and gender

### 20. State-wise Gender Distribution Percentage
- **URL**: `/dashboard/state_gender_percentage`
- **Method**: `GET`
- **Description**: Get gender distribution percentage by state

### 21. State Gender Comparison wrt Country Gender
- **URL**: `/dashboard/state_gender_comparison`
- **Method**: `GET`
- **Description**: Get gender comparison between states and country

### 22. Gender-wise Vaccinated with Both Doses
- **URL**: `/dashboard/vaccinated_both_doses_by_gender`
- **Method**: `GET`
- **Description**: Get count of fully vaccinated users by gender

### 23. State and Gender-wise Vaccination Ratio
- **URL**: `/dashboard/state_gender_vaccination_ratio`
- **Method**: `GET`
- **Description**: Get vaccination ratio by state and gender

### 24. Get All Aadhaar Data
- **URL**: `/dashboard/all_aadhar_data`
- **Method**: `GET`
- **Description**: Retrieve all Aadhaar user data with city and state information
- **Response Format**:
  ```json
  {
    "success": true,
    "count": 1,
    "data": [
      {
        "tid": 1,
        "aadhar_number": "123456789012",
        "first_name": "John",
        "last_name": "Doe",
        "dob": "1990-01-01",
        "gender": "Male",
        "mobile_number": "9876543210",
        "email_id": "john.doe@example.com",
        "address": "123 Main St",
        "city_id": 1,
        "state_id": 1,
        "city_name": "Mumbai",
        "state_name": "Maharashtra",
        "preferences": {},
        "created_at": "2024-03-20T10:00:00Z",
        "updated_at": "2024-03-20T10:00:00Z"
      }
    ]
  }
  ```
- **Error Response**:
  ```json
  {
    "success": false,
    "error": "Failed to fetch Aadhaar data"
  }
  ```

## Response Format
All endpoints return JSON responses. Error responses follow the format:
```json
{
  "error": "error message"
}
```

## Notes
1. All endpoints require proper authentication (to be implemented)
2. File uploads are stored in the `/uploads` directory
3. Date formats should be in YYYY-MM-DD format
4. All percentages are rounded to 2 decimal places
5. The server automatically sends birthday wishes to Aadhaar users 