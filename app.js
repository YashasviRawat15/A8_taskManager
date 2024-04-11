
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('./config/database');
const authMiddleware = require('./middleware/auth');
const userRoutes = require('./routes/users');
const taskRoutes = require('./routes/tasks');
const http = require('http');

// Load environment variables from .env file
require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/users', userRoutes);
app.use('/tasks', authMiddleware, taskRoutes); 

// Register a new user
app.post('/register',  (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Check if password is provided
      if (!username || !password) {
         return res.status(400).json({ error: 'Username and password are required' }); 
        }
  
      const saltRounds = 12; 
      const hashedPassword =  bcrypt.hash(password, saltRounds);
  
      // Insert the user into the database with hashed password
      const [result] =  db.query(
        'INSERT INTO users (username, password) VALUES (?, ?)',
        [username, hashedPassword]
      );
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

// Login user and generate JWT token
app.post('/login',  (req, res) => {
  const jwtSecret = process.env.JWT_SECRET;
  console.log(`JWT Secret: ${jwtSecret}`);
  const { username, password } = req.body;

  try {
    // Fetch user from database
    const [rows] =  db.query('SELECT * FROM users WHERE username = ?', [username]);
    const user = rows[0];

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const isPasswordValid =  bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});





// Start the server
const PORT = process.env.PORT || 3000;




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

