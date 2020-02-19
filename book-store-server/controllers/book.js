const Book = require('../models/Book');
const bookValidation = require('../validations/book');

// Get all book from the database
const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find({});
        res.send(books);
    }
    catch(error) {
        res.send({ message: error });
    }
}

// Insert one or many books into the database
const insertBooks = async (req, res) => {
    const newBooks = req.body;

    // Validate data post to server
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

const bestSeller = async (req, res) => {
    try {
        const result = await Book.find({}).sort({ seller: -1 }).limit(10);
        res.send(result);
    }
    catch(error) {
        console.log(error);
    }
}

const booksPagination = async (req, res) => {
    const page = req.query.page;
    const field = req.query.field;
    const sort = parseInt(req.query.sort);
    if (parseInt(page) !== NaN) {
        const perPage = parseInt(process.env.PER_PAGE);
        try {
            const skip = (page - 1) * perPage;
            const books = await Book.find({})
                .sort({ [field]: sort })
                .skip(skip)
                .limit(perPage)
            res.send(books);
        }
        catch(error) {
            res.send({ message: error })
        }
    }
    else
        res.send({ message: 'Params is invalid' });
}

module.exports = { getAllBooks, insertBooks, bestSeller, booksPagination }