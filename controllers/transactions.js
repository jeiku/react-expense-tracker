const Transaction = require('../models/Transaction');
// furst thing need to do is get transactions from database
// when we use mongoose method, it returns promise, so make all async

// @desc    Get all transactions
// @route   GET /api/v1/transactions
// @access  Public
exports.getTransactions = async (req, res, next) => {
    // this is just to test with postman
    // res.send('GET transactions');

    try {
        // want to use our model (Transaction) and .find to get all the transactions
        // and its a promise, so await..
        const transactions = await Transaction.find();

        return res.status(200).json({
            success: true,
            // if getting multiple pieces of data, can have a count
            count: transactions.length,
            // then the actual data
            data: transactions
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}

// @desc    Add transactions
// @route   POST /api/v1/transactions
// @access  Public
exports.addTransaction = async (req, res, next) => {

    try {
        // in order for us to use req.body, need body parser middleware in server.js (app.use(express.json()))
        // this is data thats sent to create a transaction
        const { text, amount } = req.body;

        // .create is a mongoose method, so await..
        // only accepts the fields that are in out model Transactions.. if name, data, cost, etc.. wont work. needs text, amount
        const transaction = await Transaction.create(req.body);

        // if it works and transaction is created, rteturn response (201 if send and successful)
        return res.status(201).json({
            success: true,
            data: transaction
        });
    } catch (err) {
        // if wrong data requested, get validation error (check postman)
        // so, wat to check for that error
        if(err.name === 'ValidationError') {
            // send good specific error message
            // for each value in the err.errors, we wnt to get the values messages in an array
            const messages = Object.values(err.errors).map(val => val.message);
            // status 400 cuz its client error, didnt send what it was supposed to
            res.status(400).json({
                success: false,
                error: messages
            });
        } else {
            // else send generic error
            return res.status(500).json({
                success: false,
                error: 'Server Error'
            });
        }
    }
}

// @desc    Delete transactions
// @route   DELETE /api/v1/transactions/:id
// @access  Public
exports.deleteTransaction = async (req, res, next) => {
    try {
        const transaction = await Transaction.findById(req.params.id);

        // if there isnt a transaction found
        if(!transaction) {
            return res.status(404).json({
                success: false,
                error: 'No transaction found'
            })
        }
        // if transaction found, take that specific transaction from database and remove
        await transaction.remove();

        // once its removed
        return res.status(200).json({
            success: true,
            data: {}
        })
    } catch (err) {
        // else send generic error
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}