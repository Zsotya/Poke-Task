const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

// Create the database connection function
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to database");
});

// Export
module.exports = db;
