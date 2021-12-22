const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const receiptSchema = new Schema({
  username: { type: String, required: true },
  receiptname: { type: String, required: true },
  link: { type: String, required: true },
  like: { type: Number, required: false },
  duration: { type: Number, required: true },
  date: { type: Date, required: true },
}, {
  timestamps: true,
});

const Receipt = mongoose.model('Receipt', receiptSchema);

module.exports = Receipt;