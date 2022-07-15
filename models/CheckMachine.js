const mongoose = require("mongoose");

const reqString = {
  type: String,
  require: true,
};

const CheckMachine = mongoose.Schema({
  number: reqString,
  date_check: {
    type: Date,
    default: Date.now,
  },
  applicant: reqString,
  alsin_code: reqString,
  alsin_name: reqString,
  brand: reqString,
  examiner: reqString,
  tim: reqString,
  status: reqString,
});

module.exports = mongoose.model("checkMachine", CheckMachine);
