const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  userId: { type: String },
  email: { type: String},
  amount: { type: String },
  crypto: { type: String },
  status: { type: String },
  bank:{type: String},
  type:{type: String},
  walletAddress: { type: String },
  date: { type: String },
  
});

const Transaction = mongoose.model("transaction", transactionSchema);

module.exports = Transaction;
