const joi = require('@hapi/joi');

const bookValidation = (data) => {
    const schema = joi.object({
        name: joi.string().required(),
        author: joi.string(),
        price: joi.string().required(),
        cover: joi.string(),
        view_count: joi.number()
    })
}

module.exports = bookValidation;