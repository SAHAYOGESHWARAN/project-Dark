const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User'); // Adjust the path as needed

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/redirect', // This must match the redirect URI in Google Cloud Console
    // Ensure you are using `http` or `https` consistently
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Check if user already exists in our db
        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) {
            // Already have this user
            return done(null, existingUser);
        }

        // If not, create a new user in our db
        const newUser = await new User({
            googleId: profile.id,
            email: profile.emails[0].value,
            name: profile.displayName
        }).save();
        done(null, newUser);
    } catch (error) {
        done(error, null);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});
