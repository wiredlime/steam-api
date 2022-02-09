const mongoose = require("mongoose");

const schema = mongoose.Schema({
  list: [String],
});
const Tag = mongoose.model("Steamspy_tags", schema);
module.exports = Tag;
