const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

require("dotenv").config();

// const MONGO_URI = `mongodb://localhost:27017/steam`; //dev
const { MONGO_ATLAS_ACCOUNT, MONGO_ATLAS_PASSWORD } = process.env;
console.log(MONGO_ATLAS_ACCOUNT);
console.log(MONGO_ATLAS_PASSWORD);
const MONGO_URI = `mongodb+srv://${MONGO_ATLAS_ACCOUNT}:${MONGO_ATLAS_PASSWORD}@cluster0.ec3yniw.mongodb.net/test`;
// Connect MongoDB at default port 27017.
mongoose.connect(
  MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) {
      console.log("MongoDB connect success");
    } else {
      console.log("Error in DB connection: " + err);
    }
  }
);
mongoose.set("strictQuery", true);
