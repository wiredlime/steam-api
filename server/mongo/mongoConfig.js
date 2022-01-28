const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/steam";

console.log("a");
mongoose.Promise = global.Promise;

const mongoOption = {
  useNewUrlParser: true,
};

mongoose.connect(mongoURI, mongoOption, (err) => {
  if (!err) {
    console.log("MongoDB Connection Succeeded.");
  } else {
    console.log("Error in DB connection: " + err);
  }
});
