const express = require("express");
const router = express.Router();

const Feature = require("../model/features");
const Genre = require("../model/genres");
const Tag = require("../model/steamspy-tags");
const Game = require("../model/games");

//utils try catch async
const catchAsync = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);
//utils return correct offset and limit for pagination
const paginationInfo = (page, limit) => {
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;
  const offset = limit * (page - 1);
  return { limit, offset };
};

//routes and controllers
router.get("/", async (req, res, next) => {
  res.send("Welcome to CoderSchool's Steam api");
});

router.get(
  "/genres",
  catchAsync(async (req, res, next) => {
    const { limit, offset } = paginationInfo(req.query.page, req.query.limit);
    let data = await Genre.find();
    // data.slice(off)
    //js pagination

    res.status(200).send(data[0].list);
  })
);

router.get(
  "/features",
  catchAsync(async (req, res, next) => {
    const data = await Feature.find().select("name", "appid");
    res.status(200).send(data[0].list);
  })
);

router.get(
  "/steamspy-tags",
  catchAsync(async (req, res, next) => {
    const { limit, offset } = paginationInfo(req.query.page, req.query.limit);
    const data = await Tag.find().skip(offset).limit(limit);
    res.status(200).send(data[0].list);
  })
);

router.get(
  "/games",
  catchAsync(async (req, res, next) => {
    let { page, limit, q, ...filter } = req.query;
    if (q) filter.name = new RegExp(q.toLowerCase().trim().replace(" ", "|"));
    const pagination = paginationInfo(page, limit);
    const data = await Game.find(filter)
      .limit(pagination.limit)
      .skip(pagination.offset);
    res.status(200).send(data);
  })
);

router.get(
  "/single-game/:appid",
  catchAsync(async (req, res, next) => {
    let { appid } = req.params;
    if (!appid) throw new Error("appid missing request");
    let data = await Game.findOne({ appid });
    if (!data) throw new Error("App not found");
    res.status(200).send(data);
  })
);

module.exports = router;
