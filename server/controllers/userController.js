const User = require('../models/userModels');
const jwt= require('jsonwebtoken');
const createToken = (_id) =>{
return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'});
}
const mongoose = require('mongoose');
//encryption
const bcrypt = require('bcrypt');
//user login
const userLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Please fill all fields' });
    }
    try {
        const user = await User.findOne({ email });
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!user || passwordMatch === false) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        res.status(500).json({ error:error.message });
    }
};

//user signup
const userSignup = async (req, res) => {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
        return res.status(400).json({ error: 'Please fill all fields' });
    }
    try {
        const user = await User.signup(email, password, username);
        //create a token
        const token = createToken(user._id);
        res.status(200).json({email, token});
    } catch (error) {
        res.status(400).json({ error:error.message});
    }
};

module.exports = {
    userLogin,
    userSignup
};