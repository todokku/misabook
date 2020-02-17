const User = require('../models/User');
const { registerValidation, loginValidate } = require('../validations/auth')
const bcrypt = require('bcrypt');

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

module.exports = { register }