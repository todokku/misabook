const mongoose = require('mongoose');
const Order = require('../models/Order');
const Book = require('../models/Book');
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
    const { errors } = orderValidation(req.body);

    if (!errors) {
        try {
            // Create new order
            const newOrder = new Order({
                name: req.body.name,
                'phone-number': req.body.phoneNumber,
                address: req.body.address,
                items: req.body.items
            });

            const items = req.body.items;
    
            // Update seller in database
            for (let i = 0; i < items.length; i++) {
                const preBook = await Book.findOne({ _id: items[i].id })
                console.log(preBook)
                const newSeller = preBook.seller + items[i].amount;
                await Book.updateOne(
                    { _id: mongoose.Types.ObjectId(items[i].id) },
                    { $set: {
                        seller: newSeller
                    } }
                );
            }

            const savedOrder = await newOrder.save();
            res.send(savedOrder);
        }
        catch(error) {
            res.send({ message: error });
        }
    }
    else {
        res.send({ message: errors });
    }
}

module.exports = { getAllOrder, insertOrder }