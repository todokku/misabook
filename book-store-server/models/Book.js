const mongoose = require('mongoose');

const Book = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true,
        default: 'unknown'
    },
    view_count: {
        type: Number,
        required: true,
        default: 0
    }
});