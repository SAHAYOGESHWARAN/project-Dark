const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User'); // Make sure the User model is properly set up

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/redirect' // Ensure this matches your Google Console
    },
    async (accessToken, refreshToken, profile, done) => {
        // Logic to find or create user in the database
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    // Find the user in the database
    User.findById(id, (err, user) => {
        done(err, user);
    });
});
