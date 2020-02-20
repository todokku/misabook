const Order = require('../models/Order');
const orderValidation = require('../validations/order');

const getAllOrder = async (req, res) => {
    try {
        const orders = await Order.find({});
        res.send(orders);
    }
    catch(error) {
        res.send({ message: error });
    }
}

const insertOrder = async (req, res) => {
    try {
        const newOrder = new Order({
            name: req.body.name,
            'phone-number': req.body.phoneNumber,
            address: req.body.address,
            items: req.body.items
        });
        
        const savedOrder = await newOrder.save();
        res.send(savedOrder);
    }
    catch(error) {
        res.send({ message: error });
    }
}

module.exports = { getAllOrder, insertOrder }