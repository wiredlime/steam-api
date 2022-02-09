const mongoose = require("mongoose");

const schema = mongoose.Schema({
  list: [],
});

const Feature = mongoose.model("Features", schema);
module.exports = Feature;
