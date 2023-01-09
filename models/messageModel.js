const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String},
  message: { type: String },
 
});

const Message = mongoose.model("message", messageSchema);

module.exports = Message;
