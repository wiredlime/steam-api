const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const MONGO_URI = `mongodb://localhost:27017/steam`; //devlopment
// Connect MongoDB at default port 27017.
mongoose.connect(
  MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) {
      console.log("MongoDB.");
    } else {
      console.log("Error in DB connection: " + err);
    }
  }
);
