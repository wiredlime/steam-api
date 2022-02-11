// const catchAsync = require("./catchAsync");
const Feature = require("./model/features");
const Game = require("./model/games");
const Genre = require("./model/genres");
const Tag = require("./model/steamspy-tags");

// //Import json data
const raw = require("./steam-db.json");

const genres = {};
const steamspy_tags = {};
// //sort raw by (positive rating / positive rating + negative rating))
// //while sort , collect genres and tag into dictionary and count freq
raw.sort((a, b) => {
  //dictionary of genres,tags
  a.genres.forEach((element) => {
    genres[element] ? (genres[element] += 1) : (genres[element] = 1);
  });
  a.steamspy_tags.forEach((element) => {
    steamspy_tags[element]
      ? (steamspy_tags[element] += 1)
      : (steamspy_tags[element] = 1);
  });
  //Compare positive and negative rating to sort
  return (
    Number(b.positive_ratings) -
    Number(b.negative_ratings) -
    (Number(a.positive_ratings) - Number(a.negative_ratings))
  );
});

//each entry of dictionary , create a document in gernes and tag (db)
(async function () {
  for await (const [key, value] of Object.entries(genres)) {
    const entry = await Genre.create({ name: key, count: value });
    console.log("ok", entry);
  }
  for await (const [key, value] of Object.entries(steamspy_tags)) {
    const entry = await Tag.create({ name: key, count: value });
    console.log("ok", entry);
  }
})();

// Loop through json add to game collection
// Promise.all(
//   raw.map(async (e) => {
//     console.log("A");
//     // const exist = await Game.findOne({ appId: e.appId });
//     await Game.create(e);
//   })
// );
