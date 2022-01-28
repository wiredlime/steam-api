const { MongoClient } = require("mongodb");
let _db;

module.exports = {
  connectToServer: function (callback) {
    MongoClient.connect("mongodb://localhost:27017", function (err, client) {
      _db = client.db("steam");
      return callback(err);
    });
  },
  getDb: function () {
    return _db;
  },
};
