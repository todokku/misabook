const joi = require('@hapi/joi');

const orderValidation = (data) => {
    const schema = joi.object({
        name: joi.string().required(),
        'phone-number': joi.string().required(),
        address: joi.string().required(),
        items: joi.array().required()
    });
    
    return schema.validate(data);
}

module.exports = orderValidation;