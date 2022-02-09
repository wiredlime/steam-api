const express = require("express");
const Feature = require("../model/features");
const Genre = require("../model/genres");
const Tag = require("../model/steamspy-tags");
const router = express.Router();
const createError = require("http-errors");
const Game = require("../model/games");

router.get("/", async (req, res, next) => {
  res.send("Welcome to CoderSchool's Steam api");
});

router.get("/genres", async (req, res, next) => {
  const data = await Genre.find();
  res.status(200).send(data[0].list);
});

router.get("/features", async (req, res, next) => {
  const data = await Feature.find();

  res.status(200).send(data[0].list);
});

router.get("/steamspy-tags", async (req, res, next) => {
  const data = await Tag.find();
  console.log(data);
  res.status(200).send(data[0].list);
});

router.get("/games", async (req, res, next) => {
  let { page, limit, q, ...filter } = req.query;
  // const allowed = ["genres", "steamspy-tags", "q"];

  if (q) filter.name = new RegExp(q.toLowerCase().trim().replace(" ", "|"));

  console.log(filter.name);

  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;

  const offset = limit * (1 - page);

  const data = await Game.find(filter).limit(limit).skip(offset);
  res.status(200).send(data);
});

router.get("/single-game/:appid", async (req, res, next) => {
  let { appid } = req.params;
  console.log(appid);
  const data = await Game.findOne({ appid });
  console.log(data);
  res.status(200).send(data);
});

module.exports = router;
