const express = require('express');
const router = express.Router();
const {userLogin, userSignup} = require('../controllers/userController');
//User Login
router.post('/login',userLogin);
//User Signup
router.post('/signup',userSignup);
module.exports = router;