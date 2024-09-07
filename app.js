const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const path = require('path');
require('dotenv').config();
require('./config/passport-setup'); // Ensure passport setup is configured

const authRoutes = require('./routes/auth');
const app = express();

// Middleware for parsing JSON bodies
app.use(express.json());

// Session setup
app.use(session({
    secret: process.env.COOKIE_KEY, // Ensure this is set in your .env file
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Authentication routes
app.use('/auth', authRoutes);

// Default route to serve the login page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
