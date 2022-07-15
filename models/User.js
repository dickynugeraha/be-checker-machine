const mongoose = require("mongoose");

const reqString = {
  type: String,
  require: true,
};

const User = mongoose.Schema({
  username: reqString,
  name: reqString,
  password: reqString,
  role: reqString,
});

module.exports = mongoose.model("users", User);
