const express = require("express");
const router = express.Router();
const mongodbutil = require("../mongo/mongoUtil");
let db = mongodbutil.getDb();

router.get("/", async (req, res, next) => {
  const dba = await db.collection("games");
  const result = await dba.find().toArray();
  const length = result.length;
  res.send({ status: "success", data: result, length });
});

module.exports = router;
