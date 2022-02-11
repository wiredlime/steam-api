const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: String,
  count: Number,
});
const Genre = mongoose.model("Genres", schema);
module.exports = Genre;
