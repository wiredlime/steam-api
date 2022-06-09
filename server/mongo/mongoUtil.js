const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

// const MONGO_URI = `mongodb://localhost:27017/steam`; //dev
const { MONGO_ATLAS_ACCOUNT, MONGO_ATLAS_PASSWORD } = process.env; //
const MONGO_URI = `mongodb+srv://${MONGO_ATLAS_ACCOUNT}:${MONGO_ATLAS_PASSWORD}@steam-api.jisar.mongodb.net/steam?retryWrites=true&w=majority`;
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
