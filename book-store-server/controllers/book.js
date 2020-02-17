const Book = require('../models/Book');
const bookValidation = require('../validations/book');

// Get all book from the database
const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find({});
        res.send(json(books));
    }
    catch(error) {
        res.send({ message: error });
    }
}

// Insert one or many books into the database
const insertBooks = async (req, res) => {
    const newBooks = req.body;

    const { errors } = bookValidation(newBooks);
    if (errors)
        return res.send({ message: errors });

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