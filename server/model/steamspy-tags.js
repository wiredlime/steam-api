const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: String,
  count: Number,
});
const Tag = mongoose.model("Steamspy_tags", schema);
module.exports = Tag;
