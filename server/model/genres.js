const mongoose = require("mongoose");

const schema = mongoose.Schema({
  list: [String],
});
const Genre = mongoose.model("Genres", schema);
module.exports = Genre;
