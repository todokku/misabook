const Book = require('../models/Book');

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find({});
        res.send(json(books));
    }
    catch(error) {
        res.send({ message: error });
    }
}

const insertBooks = async (req, res) => {
    const newBooks = req.body;

    try {
        await Book.insertMany(newBooks, (err, savedBooks) => {
            if (err)
                throw err;
            else
                res.send(savedBooks);
        });
    }
    catch(error) {
        res.send({ message: error })
    }
}

module.exports = { getAllBooks, insertBooks }