const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

// Read users
const getUsers = () => {
  const data = fs.readFileSync("users.json");
  return JSON.parse(data);
};

// Save users
const saveUsers = (users) => {
  fs.writeFileSync("users.json", JSON.stringify(users, null, 2));
};

// Signup API
app.post("/signup", (req, res) => {
  const { email, password } = req.body;

  let users = getUsers();

  // Check if user already exists
  const userExists = users.find((u) => u.email === email);

  if (userExists) {
    return res.json({ message: "User already exists ❌" });
  }

  // Add new user
  users.push({ email, password });
  saveUsers(users);

  res.json({ message: "Signup successful ✅" });
});

// Login API
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  let users = getUsers();

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (user) {
    res.json({ message: "Login successful ✅" });
  } else {
    res.json({ message: "Invalid credentials ❌" });
  }
});

// Test route
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});