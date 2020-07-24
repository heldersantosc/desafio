const mongoose = require("mongoose");

const EnterpriseSchema = new mongoose.Schema({
  enterpriseId: { type: String, unique: true },
  enterpriseCnpj: { type: String, unique: true },
  enterprise: Object,
});

module.exports = mongoose.model("enterprise", EnterpriseSchema);
