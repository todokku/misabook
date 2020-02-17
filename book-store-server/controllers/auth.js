const { registerValidation, loginValidate } = require('../validations/auth')

const register = async (req, res) => {
    // Validate data send to server
    const { errors } = registerValidation(req.body);

    if (errors)
        return res.send({ message: errors });

    // Checking user already exists
    
}