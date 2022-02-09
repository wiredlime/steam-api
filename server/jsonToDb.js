// const catchAsync = require("./catchAsync");
// const Feature = require("./model/features");
// const Game = require("./model/games");
// const Genre = require("./model/genres");
// const Tag = require("./model/steamspy-tags");
// const createError = require("http-errors");
// // //Import json data
// const raw = require("./steam-db.json");

// const genreSet = new Set();
// const tagSet = new Set();
// raw.sort((a, b) => {
//   //Collect genre and tag
//   a.genres.forEach((e) => {
//     if (e.length > 1) genreSet.add(e);
//   });
//   a.steamspy_tags.forEach((e) => {
//     if (e.length > 1) tagSet.add(e);
//   });
//   //   console.log(a.name);
//   //Compare positive and negative rating to sort
//   return (
//     Number(b.positive_ratings) -
//     Number(b.negative_ratings) -
//     (Number(a.positive_ratings) - Number(a.negative_ratings))
//   );
// });

//Loop through json add to game collection
// Promise.all(
//   raw.map(async (e) => {
//     console.log("A");
//     // const exist = await Game.findOne({ appId: e.appId });
//     await Game.create(e);
//   })
// );

// //sort raw by (positive rating / positive rating + negative rating))
// //while sort , collect genres and tag
// //after select an array of featured game (top 10 )

// // //add feature,genres,tags array to db

/**
 * WARNING: HACKY AS FK, should be relationship model
 */
// const featureArray = new Array(10).fill("").map((e, idx) => raw[idx]);

// Feature.create({ list: featureArray });
// const genres = Array.from(genreSet);
// Genre.create({ list: genres });

// const steamspy_tags = Array.from(tagSet);
// Tag.create({ list: steamspy_tags });
