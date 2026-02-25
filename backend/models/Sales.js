const mongoose = require("mongoose");

const salesSchema = new mongoose.Schema({
  product: String,
  category: String,
  amount: Number,
  date: Date,
  status: String,
});

module.exports = mongoose.model("Sales", salesSchema);