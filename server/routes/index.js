const express = require("express");
const { set } = require("mongoose");
const router = express.Router();
const mongodbutil = require("../mongo/mongoUtil");
let db = mongodbutil.getDb();

router.get("/", async (req, res, next) => {
  res.send("Welcome to CoderSchool's Steam api");
});

router.get("/games", async (req, res, next) => {
  let { page, limit, sortBy, ...filter } = req.query;
  // process pagination
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;

  // process filter and search
  for (const [key, value] of Object.entries(filter)) {
    if (value) {
      switch (key) {
        case "search":
          filter.name = new RegExp(
            value
              .split(" ")
              .map((e) => {
                e[0].toUpperCase();
                return e;
              })
              .join("|")
          );
          break;
        case "genres":
        case "steamspy_tags":
          filter[key] = value[0].toUpperCase() + value.slice(1);
          break;

        default:
          break;
      }
    }
  }

  console.log(filter);
  // Query
  const result = await db
    .collection("games")
    .find(filter)
    .skip(limit * (page - 1))
    .limit(limit)
    .toArray();

  const length = result.length;

  res.send({ status: "success", data: result, length });
});
// router.get("/genres", async (req, res, next) => {
//   const result = await db.collection("genres");
//   const length = result.length;
//   res.send({ status: "success", data: result, length });
// });

module.exports = router;
