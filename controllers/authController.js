exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) return next(err);
        req.session = null; // Clear the session
        res.status(200).send('Logged out successfully');
    });
};
