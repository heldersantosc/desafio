const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  customerId: { type: String, unique: true },
  customerCpf: { type: Number, unique: true },
  customer: Object,
});

module.exports = mongoose.model("customer", CustomerSchema);
