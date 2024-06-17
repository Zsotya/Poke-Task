const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../db");
const router = express.Router();

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

module.exports = router;
