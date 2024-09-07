const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: String,  // Only for local registration
    googleId: String,  // Only for Google OAuth users
    name: String,
    picture: String
});

const User = mongoose.model('User', userSchema);
module.exports = User;
