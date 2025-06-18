# Aadhaar Backend

Node.js Express app to manage Aadhaar registration, analytics, file uploads, cron jobs, and email notifications.

## Setup

```bash
git clone <repo_url>
cd your_app
npm install
```
Update **env.json** with your database and email credentials.

## Run

```bash
npm start
```

Server starts on `http://localhost:9000`

## SQL

Import all scripts in **sql/** to set up tables, stored procedures, and sample data:

1. `table.sql`
2. `sp_call.sql`
3. `sp_generate_random_aadhar_data.sql`