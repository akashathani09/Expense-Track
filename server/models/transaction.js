const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  text: {
    type: String,
    trim: true,
    required: [true, 'Please add a title/description']
  },
  amount: {
    type: Number,
    required: [true, 'Please add a positive or negative amount']
  },
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: [true, 'Please specify type (income or expense)']
  },
  category: {
    type: String,
    required: [true, 'Please select a category'],
    default: 'General'
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Transaction', TransactionSchema);