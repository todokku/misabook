const joi = require('@hapi/joi');

const registerValidation = (data) => {
    const schema = joi.object({
        name: joi.string().min(3).required(),
        email: joi.string().min(6).required(),
        pasword: joi.string().min(8).required()
    });

    return schema.validate(data);
}

const loginValidate = (data) => {
    const schema = joi.object({
        email: joi.string().min(6).required(),
        pasword: joi.string().min(8).required()
    });

    return schema.validate(data);
}

module.exports = { registerValidation, loginValidate };