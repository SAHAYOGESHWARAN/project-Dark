const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
require('dotenv').config();
require('./config/passport-setup');

const authRoutes = require('./routes/auth');
const app = express();

app.use(express.json()); // For parsing JSON bodies
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY]
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error(err));

// Serve static files
app.use(express.static('public'));

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
