const mongoose = require("mongoose");

const reqString = {
  type: String,
  require: true,
};

const DocMachine = mongoose.Schema({
  document_number: reqString,
  track_code: reqString,
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
  status: {
    type: String,
    require: true,
    default: "Belum Diuji",
  },
  document_file: reqString,
});

module.exports = mongoose.model("docMachine", DocMachine);
