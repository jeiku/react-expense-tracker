const mongoose = require('mongoose');
const { cyan } = require('colors');

// whenever we make any calls with mongoose to connect, it returns a promise, so use async await
const connectDB = async () => {
    // async/await we use try catch blocks
    try {
        // connection variable, returns a promise so add await.. otherwise need to add .then .then .then
        // want to connect to our mongoURI, which we have as global vriable, so access it..
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            //add properties to stop some of the warnings mongoose might give us..
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });

        // Once we are connected.. log that we are connected, show host
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
    } catch (err) {
        console.log(`Error: ${err.message}`.red);
        // if exit with a failure, want application to shut down
        process.exit(1);
    }
}

module.exports = connectDB;
// bring it into server.js