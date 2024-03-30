const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Signup endpoint
app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    
    // Check if username already exists
    const users = readUsersFromFile();
    if (users[username]) {
        return res.status(400).send('Username already exists');
    }

    // Add new user
    users[username] = password;
    writeUsersToFile(users);
    
    res.status(201).send('User created successfully');
});

// L
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Function to read users from JSON file
const readUsersFromFile = () => {
    const usersData = fs.readFileSync('users.json');
    return JSON.parse(usersData);
}

// Function to write users to JSON file
const writeUsersToFile = (users) => {
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
}

// Signup endpoint
app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    
    // Check if username already exists
    const users = readUsersFromFile();
    if (users[username]) {
        return res.status(400).send('Username already exists');
    }

    // Add new user
    users[username] = password;
    writeUsersToFile(users);
    
    res.status(201).send('User created successfully');
});