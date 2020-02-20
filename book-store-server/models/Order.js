const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    'phone-number': {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    items: {
        type: Object,
        required: true
    }
});

module.exports = mongoose.model('Order', orderSchema);