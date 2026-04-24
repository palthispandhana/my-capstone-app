const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

const SECRET_KEY = "mysecretkey";

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.post("/signup", (req, res) => {
  const { email, password } = req.body;
  console.log("Signup:", email, password);
  res.json({ message: "User registered successfully ✅" });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log("Login:", email, password);

  // Generate token so frontend can store it
  const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });

  res.json({
    message: "Login successful ✅",
    token: token,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});