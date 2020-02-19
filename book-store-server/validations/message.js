const joi = require('@hapi/joi');

const messageValidation = (data) => {
    const schema = joi.object({
        name: joi.string().required(),
        email: joi.string().required(),
        message: joi.string().required()
    });
    
    return schema.validate(data);
}

module.exports = messageValidation;