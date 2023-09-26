const bcrypt = require("bcrypt");
const saltRounds = 10;
// const password = "Admin@123";

const express = require("express");
const app = express();
app.use(express.json());

// In-memory storage for user data
// const users = [];
const users = [
  { username: "sami", password: "Strong#Password#" },
  { username: "rami", password: "Strong#Password#" },
];

// Endpoint for user registration
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  // Check if the username is already taken
  if (users.some((user) => user.username === username)) {
    return res.status(400).json({ message: "Username already taken" });
  }
  const salt = await bcrypt.genSalt(saltRounds);
  console.log("Salt: ", salt);
  const hash = await bcrypt.hash(password, salt);
  console.log("Hash: ", hash);

  // Save the user data (in-memory storage for demonstration)
  users.push({ username: username, password: hash });

  res.status(201).json({ message: "User registered successfully" });
});

app.get("/users", (req, res) => {
  const userInformation = users.map((user) => {
    return { username: user.username, password: user.password };
  });

  res.status(200).json(userInformation);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
