const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        required: true,
        default: 'https://res.cloudinary.com/dumfvnj9f/image/upload/v1581948108/bookstore/thumbnail_Image_jmwwre.jpg'
    },
    author: {
        type: String,
        required: true,
        default: 'unknown'
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    view_count: {
        type: Number,
        required: true,
        default: 0
    }
});

module.exports = mongoose.model('Book', BookSchema)