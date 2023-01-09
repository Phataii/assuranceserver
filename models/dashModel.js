const mongoose = require("mongoose");

const dashSchema = new mongoose.Schema({
  //Dashboard fields
  userId: { type: String },
  email: { type: String },
  deposit: { type: String },
  profit: { type: String },
  packages: { type: String },
  bonus: { type: String },
  withdraw: { type: String },
});

const Dashboard = mongoose.model("dashboard", dashSchema);

module.exports = Dashboard;
