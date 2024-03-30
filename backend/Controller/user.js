const express = require("express");
const bcrypt = require("bcrypt"); // Import bcrypt for password hashing

const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Function to read users from JSON file
const readUsersFromFile = () => {
  try {
    const usersData = fs.readFileSync("users.json");
    return JSON.parse(usersData);
  } catch (error) {
    console.error("Error reading users file:", error);
    return {}; // Return empty object on error
  }
};

// Function to write users to JSON file
const writeUsersToFile = (users) => {
  try {
    fs.writeFileSync("users.json", JSON.stringify(users, null, 2));
  } catch (error) {
    console.error("Error writing users file:", error);
  }
};

// Improved Signup endpoint with Bcrypt for secure password hashing
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  // Check if username already exists
  const users = readUsersFromFile();
  if (users[username]) {
    return res.status(400).send("Username already exists");
  }

  // Hash the password using bcrypt with appropriate cost factor
  try {
    const saltRounds = 10; // Adjust this value based on security requirements
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Add new user with hashed password
    users[username] = hashedPassword;
    writeUsersToFile(users);

    res.status(201).send("User created successfully");
  } catch (error) {
    console.error("Error hashing password:", error);
    res.status(500).send("Internal server error"); // Handle hashing errors gracefully
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
