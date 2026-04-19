const express = require("express");
const cors = require("cors");
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());
app.use(express.json());

const SECRET_KEY = "mysecretkey"; // later move to .env

// Read users
const getUsers = () => {
  const data = fs.readFileSync("users.json");
  return JSON.parse(data);
};

// Save users
const saveUsers = (users) => {
  fs.writeFileSync("users.json", JSON.stringify(users, null, 2));
};

// Signup
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  let users = getUsers();

  const userExists = users.find((u) => u.email === email);
  if (userExists) {
    return res.json({ message: "User already exists ❌" });
  }

  // 🔐 Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  users.push({ email, password: hashedPassword });
  saveUsers(users);

  res.json({ message: "Signup successful ✅" });
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  let users = getUsers();

  const user = users.find((u) => u.email === email);

  if (!user) {
    return res.json({ message: "User not found ❌" });
  }

  // 🔐 Compare password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.json({ message: "Invalid password ❌" });
  }

  // 🔑 Generate token
  const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });

  res.json({
    message: "Login successful ✅",
    token,
  });
});

// Protected route
app.get("/profile", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.json({ message: "No token ❌" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.json({ message: "Welcome " + decoded.email });
  } catch (err) {
    res.json({ message: "Invalid token ❌" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});