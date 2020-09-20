const mongoose = require('mongoose');

// This is where all of our fields go
// in application, all our transactions have an ID (created automatically with mongoDB)

const TransactionSchema = new mongoose.Schema({
text: {
    type: String,
    trim: true,
    required: [true, 'Please add some text']
},
amount: {
    type: Number,
    required: [true, 'Please add a positive or negative number']
},
createdAt: {
    type: Date,
    // gets inserted automatically
    default: Date.now
}
});

module.exports = mongoose.model('Transaction', TransactionSchema);
// export to the controllers