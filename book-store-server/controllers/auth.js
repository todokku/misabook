const User = require('../models/User');
const { registerValidation, loginValidate } = require('../validations/auth')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    // Validate data send to server
    const { errors } = registerValidation(req.body);

    if (errors)
        return res.send({ message: errors });

    // Checking user already exists
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists)
        res.send({ message: 'Email already exists' });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create new user
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    try {
        await newUser.save();
        res.send({ user: newUser._id });
    }
    catch(error) {
        res.send({ message: error })
    }
}

const login = async (req, res) => {
    // Validate data post to server
    const { errors } = loginValidate(req.body);

    if (errors)
        return res.send({ message: errors });

    // Checking email exists
    const user = await User.findOne({ email: req.body.email });
    if (!user)
        return res.send({ message: `Email doesn't exist` });

    // Checking password is correct
    const validatePass = await bcrypt.compare(req.body.password, user.password);
    if (!validatePass)
        return res.send({ message: 'Invalid password' });

    // Create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.send({ token: token, message: 'Login successfully' });
}

const getUser = async (req, res) => {
    const token = req.body.token;
    if (!token)
        return res.send({ message: 'Access denied' });
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        
        if (!verified)
            return res.send({ message: 'Access token' });
        
        const user = await User.findOne({ _id: verified._id });
        
        if (!user)
            return res.send({ message: 'Access token' });
        
        return res.send({ message: 'Successfully' })
    }
    catch(error) {
        res.send({ message: 'Invalid token' });
    }
}

module.exports = { register, login, getUser };