const express = require("express");
const router = express.Router();

const Feature = require("../model/features");
const Genre = require("../model/genres");
const Tag = require("../model/steamspy-tags");
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
  res.status(200).send(data[0].list);
});

router.get("/games", async (req, res, next) => {
  let { page, limit, q, ...filter } = req.query;

  if (q) filter.name = new RegExp(q.toLowerCase().trim().replace(" ", "|"));

  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;

  const offset = limit * (page - 1);

  const data = await Game.find(filter).limit(limit).skip(offset);
  res.status(200).send(data);
});

router.get("/single-game/:appid", async (req, res, next) => {
  let { appid } = req.params;

  let data = await Game.findOne({ appid });
  codeStatus = 200;

  if (!data) {
    data = {};
  }
  res.status(200).send(data);
});

module.exports = router;
