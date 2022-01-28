const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const createError = require("http-errors");
const app = express();

const mongoUltil = require("./mongo/mongoUtil");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

mongoUltil.connectToServer((err) => {
  const indexRouter = require("./routes/index");
  app.use("/", indexRouter);
  //catch 404
  app.use(function (req, res, next) {
    next(createError(404));
  });
  // error handler
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    console.log(err);
    res.send(err.message);
  });
});

module.exports = app;
