// npm i express dotenv mongoose colors morgan
// npm i -D nodemon concurrently

const express = require('express');
// dotenv allows us to create global variables, like ports and database url
const dotenv = require('dotenv');
const colors = require('colors');
// morgan is a logger, tells us the methods run etc
const morgan = require('morgan');
const connectDB = require('./config/db');

// let dotenv know where config file is
dotenv.config({ path: './config/config.env' });

// call the function to connect
connectDB();

const transactions = require('./routes/transactions');

const app = express();

// allows us to use body parser
app.use(express.json());

// if in the development environment
if(process.env.NODE_ENV === 'development') {
    // then use morgan, (dev) will give us the method and stuff
    app.use(morgan('dev'));
};

// when we request to this, it is rerouted to /routes/transactions file
app.use('/api/v1/transactions', transactions);

// grab port variable from config
const PORT = process.env.PORT || 5000;

// NODE_ENV can be production, development, etc
// .yellow.bold is from colors module
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));