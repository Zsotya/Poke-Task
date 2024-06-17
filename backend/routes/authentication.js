const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");
const router = express.Router();
const dotenv = require("dotenv");

dotenv.config();

// POST /api/register - Registration endpoint
router.post("/api/register", async (req, res) => {
  // Retrieved data
  const { username, email, password } = req.body;

  try {
    // Check to see if username already exists in the database
    const checkUserQuery = "SELECT * FROM users WHERE username = ?";
    db.query(checkUserQuery, [username], async (err, results) => {
      // Error handling during query
      if (err) {
        console.error("Error checking user:", err);
        return res.status(500).json({ error: "Server error" });
      }

      // Username already exists in the database
      if (results.length > 0) {
        return res.status(400).json({ error: "Username already in use" });
      }

      // Hash the password (10 saltrounds)
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert new user into the database
      const insertUser =
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
      db.query(insertUser, [username, email, hashedPassword], (err, result) => {
        if (err) {
          console.error("Error registering user:", err);
          return res.status(500).json({ error: "Server error" });
        }
        console.log("Registration successful!");
        res.status(201).json({ message: "Registration successful!" });
      });
    });
  } catch (error) {
    // Error handling during the request
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// POST /api/login - Login endpoint
router.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if username exists in the database
    const checkUserQuery = "SELECT * FROM users WHERE username = ?";
    db.query(checkUserQuery, [username], async (err, results) => {
      if (err) {
        console.error("Error checking user:", err);
        return res.status(500).json({ error: "Server error" });
      }

      // User not found
      if (results.length === 0) {
        return res.status(401).json({ error: "This username doesn't exist" });
      }

      // Compare hashed password
      const match = await bcrypt.compare(password, results[0].password);
      if (!match) {
        return res.status(401).json({ error: "Incorrect password" });
      }

      // Successful login
      console.log("Successful login attempt");

      // Generate token
      const token = jwt.sign(
        { username: results[0].username },
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
      );

      // Respond with token
      res.status(200).json({ token, userId: results[0].id });
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
