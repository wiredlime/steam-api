const mongoose = require("mongoose");

const schema = mongoose.Schema({
  appid: String,
  name: String,
  release_date: Date,
  english: String,
  developer: [String],
  platforms: [String],
  required_age: Number,
  categories: [String],
  genres: [String],
  steamspy_tags: [String],
  achievements: String,
  positive_ratings: Number,
  negative_ratings: Number,
  average_playtime: Number,
  median_playtime: Number,
  owners: String,
  price: Number,
  header_image: String,
  background: String,
  description: String,
});
const Game = mongoose.model("Games", schema);

module.exports = Game;
