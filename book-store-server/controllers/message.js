const Message = require('../models/Message');
const messageValidation = require('../validations/message');

// Get all the messages
const getAllMessages = async (req, res) => {
    try {
        const messages = await Message.find({});
        res.send(messages);
    }
    catch(error) {
        res.send({ message: error });
    }
}

// Insert one or many books into the database
const saveMessage = async (req, res) => {
    const newMessage = req.body;

    // Validate data post to server
    const { errors } = messageValidation(newMessage);
    if (errors)
        return res.send({ message: errors });

    try {
        await Message.insertMany(newMessage, (err, savedMessage) => {
            if (err)
                throw err;
            else
                res.send(savedMessage);
        });
    }
    catch(error) {
        res.send({ message: error })
    }
}

module.exports = { saveMessage, getAllMessages }