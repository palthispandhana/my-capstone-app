const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
const usersFile = path.join(__dirname, "users.json");
const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key";

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body || {});
  next();
});

function readUsers() {
  if (!fs.existsSync(usersFile)) {
    return [];
  }
  const raw = fs.readFileSync(usersFile, "utf-8");
  return JSON.parse(raw || "[]");
}

function writeUsers(users) {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2), "utf-8");
}

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  const users = readUsers();
  const existingUser = users.find((user) => user.email === email);

  if (existingUser) {
    return res.status(400).json({ message: "User already exists." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ email, password: hashedPassword });
  writeUsers(users);

  res.json({ message: "Signup successful ✅" });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  const users = readUsers();
  const user = users.find((user) => user.email === email);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  const storedPassword = user.password;
  let passwordMatches = false;
  if (/^\$2[abxy]\$/.test(storedPassword)) {
    passwordMatches = await bcrypt.compare(password, storedPassword);
  } else {
    passwordMatches = password === storedPassword;
  }

  if (!passwordMatches) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ message: "Login successful ✅", token });
});

app.get("/profile", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    res.json({ message: `Welcome ${payload.email}! This is your profile.` });
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token." });
  }
});


//  STEP 3: ADD THIS AT VERY END (BOTTOM)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});