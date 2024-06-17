const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");

/* Middlewares */

// JSON parsing
app.use(express.json());

// CORS to allow requests from specified origin
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

// Routes imports
const authenticationRoutes = require("./routes/authentication");
const pokemonRoutes = require("./routes/pokemon");

// Routes usage
app.use(authenticationRoutes);
app.use(pokemonRoutes);

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
