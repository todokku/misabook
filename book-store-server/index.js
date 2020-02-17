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
app.listen(port, () => {
    console.log(`App is listening on port ${PORT}`);
});