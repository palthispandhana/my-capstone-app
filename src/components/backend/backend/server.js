const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Signup API
app.post("/signup", (req, res) => {
  const { email, password } = req.body;

  console.log("Signup:", email, password);

  res.json({
    message: "User registered successfully",
  });
});

// Login API
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  console.log("Login:", email, password);

  res.json({
    message: "Login successful",
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});