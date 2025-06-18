# Aadhaar Application API Endpoints

## Registration Endpoints

### 1. Insert Aadhaar User
- **URL**: `/insert_aadhar`
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
    "aadhar_number": "string",
    "city_id": "number",
    "state_id": "number",
    "preferences": "json"
  }
  ```

### 2. Update Profile Picture
- **URL**: `/update_profile_picture`
- **Method**: `POST`
- **Description**: Upload or update user's profile picture
- **Request Body**: Form-data
  - `profile`: Image file
  - `tid`: User ID (Aadhaar user's tid)

## Dashboard Endpoints

### 1. State-wise Aadhaar Count Above 60
- **URL**: `/state_wise_adhar_count_above_60`
- **Method**: `GET`
- **Description**: Get count of Aadhaar users above 60 years of age grouped by state
- **Response**: Array of objects containing state-wise counts

### 2. State-City Wise Aadhaar Users
- **URL**: `/state_city_wise_adhar_users`
- **Method**: `GET`
- **Description**: Get count of Aadhaar users grouped by state and city
- **Response**: Array of objects containing state-city wise counts

## Base URL
- Development: `http://localhost:9000`

## Notes
1. All endpoints return JSON responses
2. Error responses follow the format: `{ "error": "error message" }`
3. File uploads are stored in the `/uploads` directory
4. The server automatically sends birthday wishes to Aadhaar users 