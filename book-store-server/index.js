// Config env
const dotenv = require('dotenv');
dotenv.config();

// Require node modules
const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

const app = express();

// Middlewares
app.disable('x-powered-by');
app.use(cors());
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

// Import validating middlewares
const tokenVerify = require('./middlewares/tokenVerify');

// Import routes
const authRoute = require('./routes/auth');
const bookRoute = require('./routes/book');
const messageRoute = require('./routes/message');
const orderRoute = require('./routes/order');

// Routes
app.use('/auth', authRoute)
app.use('/books', tokenVerify, bookRoute);
app.use('/message', tokenVerify, messageRoute);
app.use('/orders', tokenVerify, orderRoute);