const express = require("express");
const cors = require("cors");
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

//  Root route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Your other routes
app.post("/signup", (req, res) => {
  // signup code
});

app.post("/login", (req, res) => {
  // login code
});

app.get("/profile", (req, res) => {
  // profile code
});


//  STEP 3: ADD THIS AT VERY END (BOTTOM)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});