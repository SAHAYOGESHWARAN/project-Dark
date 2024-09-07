const router = require('express').Router();
const passport = require('passport');

// Auth with Google
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// Google auth callback
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.send({
        message: "Logged in successfully!",
        user: req.user
    });
});

// Logout route
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) return next(err);
        res.send('Logged out successfully');
    });
});

module.exports = router;
