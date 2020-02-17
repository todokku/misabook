// Config env
const dotenv = require('dotenv');
dotenv.config();

// Require node modules
const express = require('express');

const PORT = process.env.PORT || 5000;

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// App listen
app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});

// Connect to the database
const mongoose = require('mongoose');
const url = process.env.MONGO_URL;
const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect(url, mongoOptions, () => {
    console.log('Connected to the database!');
});

// Import routes
const bookRoute = require('./routes/book');

// Routes
app.use('/books', bookRoute);