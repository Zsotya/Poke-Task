const express = require("express");
const router = express.Router();
const db = require("../db");

// POST /api/owned-pokemons/check - Check if Pokémon is owned by the user
router.post("/api/owned-pokemons/check", async (req, res) => {
  const { name, userId } = req.body;

  try {
    // Check if the user owns the specified pokemon
    const query = `
        SELECT owned
        FROM owned_pokemons
        WHERE user_id = ? AND pokemon_name = ?
      `;
    const result = await db.promise().query(query, [userId, name]);

    if (result[0].length > 0) {
      res.json({ owned: result[0][0].owned });
    } else {
      res.json({ owned: false }); // False if no record found
    }
  } catch (err) {
    // Error handling
    console.error("Error checking ownership:", err);
    res.status(500).json({ error: "Failed to check ownership" });
  }
});

// POST /api/catch-pokemon - Catch Pokémon
router.post("/api/catch-pokemon", async (req, res) => {
  const { name, userId } = req.body;

  try {
    // Check if the user already owns this pokemon
    const checkQuery = `
        SELECT owned
        FROM owned_pokemons
        WHERE user_id = ? AND pokemon_name = ?
      `;
    const checkResult = await db.promise().query(checkQuery, [userId, name]);

    // There is an existing record with the "user_id - pokemon_name" combination
    if (checkResult[0].length > 0) {
      // Update existing record to mark as owned
      const updateQuery = `
        UPDATE owned_pokemons
        SET owned = true, caught_at = CURRENT_TIMESTAMP
        WHERE user_id = ? AND pokemon_name = ?
        `;
      await db.promise().query(updateQuery, [userId, name]);
      res.json({
        message: "Pokémon caught successfully",
      });
    }
    // No record exists with the "user_id - pokemon_name" combination
    else {
      // Insert new record for the user and Pokémon
      const insertQuery = `
          INSERT INTO owned_pokemons (user_id, pokemon_name, owned, caught_at)
          VALUES (?, ?, true, CURRENT_TIMESTAMP)
        `;
      await db.promise().query(insertQuery, [userId, name]);
      res.json({
        message: "Pokémon caught successfully",
      });
    }
  } catch (err) {
    console.error("Error catching Pokémon:", err);
    res.status(500).json({ error: "Failed to catch Pokémon" });
  }
});

// POST /api/release-pokemon/:pokemonName - Release Pokémon
router.post("/api/release-pokemon", async (req, res) => {
  const { name, userId } = req.body;

  try {
    const releaseQuery = `
        UPDATE owned_pokemons
        SET owned = false
        WHERE user_id = ? AND pokemon_name = ?
      `;
    await db.promise().query(releaseQuery, [userId, name]);

    res.json({
      message: "Pokémon released successfully",
    });
  } catch (err) {
    console.error("Error releasing Pokémon:", err);
    res.status(500).json({ error: "Failed to release Pokémon" });
  }
});

// POST /api/owned-pokemons/user - Get all Pokémon owned by the user
router.post("/api/owned-pokemons", async (req, res) => {
  const { userId } = req.body;

  try {
    const query = `
      SELECT pokemon_name AS name
      FROM owned_pokemons
      WHERE user_id = ? AND owned = true
    `;
    const [results] = await db.promise().query(query, [userId]);

    const pokemons = results.map((row) => ({
      name: row.name,
    }));

    res.json({ pokemons });
  } catch (err) {
    console.error("Error fetching owned Pokémon:", err);
    res.status(500).json({ error: "Failed to fetch owned Pokémon" });
  }
});

module.exports = router;
