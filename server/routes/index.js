const express = require("express");
const router = express.Router();

const Feature = require("../model/features");
const Genre = require("../model/genres");
const Tag = require("../model/steamspy-tags");
const Game = require("../model/games");

const hideDescription = "-description";

//utils try catch async bad request
const catchAsync = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch((err) => {
    err.status = 400;
    err.message = `BadRequest ${err.message}`;
    next(err);
  });
//utils return correct offset and limit for pagination
const paginationInfo = (page, limit) => {
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;
  const offset = limit * (page - 1);
  return { limit, offset, page };
};

//routes and controllers
router.get("/", async (req, res, next) => {
  res.send("Welcome to CoderSchool's Steam api");
});

router.get(
  "/genres",
  catchAsync(async (req, res, next) => {
    const { limit, offset, page } = paginationInfo(
      req.query.page,
      req.query.limit
    );
    let total = await Genre.countDocuments();
    let data = await Genre.find().skip(offset).limit(limit);

    res.status(200).send({ data, page, total });
  })
);

router.get(
  "/features",
  catchAsync(async (req, res, next) => {
    const data = await Feature.find().select(hideDescription);

    res.status(200).send({ data: data[0].list, total: data[0].list.length });
  })
);

router.get(
  "/steamspy-tags",
  catchAsync(async (req, res, next) => {
    const { limit, offset, page } = paginationInfo(
      req.query.page,
      req.query.limit
    );
    const data = await Tag.find().skip(offset).limit(limit);
    let total = await Tag.countDocuments();
    res.status(200).send({ data, page, total });
  })
);

router.get(
  "/games",
  catchAsync(async (req, res, next) => {
    console.log("this is query", req.query);
    // console.log(new URL(req.query));
    let { page, limit, q, ...filter } = req.query;
    // | for any in paragraph , i for ignore case
    if (q) filter.name = new RegExp(q.trim().replace(" ", "|"), "i");
    const pagination = paginationInfo(page, limit);
    let total = await Game.countDocuments(filter);

    const data = await Game.find(filter)
      .limit(pagination.limit)
      .skip(pagination.offset)
      .select(hideDescription);

    res.status(200).send({ data, page: pagination.page, total });
  })
);

router.get(
  "/single-game/:appid",
  catchAsync(async (req, res, next) => {
    let { appid } = req.params;
    if (!appid) throw new Error("appid missing request");
    let data = await Game.findOne({ appid });
    if (!data) throw new Error("App not found");
    res.status(200).send({ data });
  })
);

router.post("/post-demo", (req, res, next) => {
  console.log("this is body", req.body);
  res.status(200).send("hahah");
});

module.exports = router;
