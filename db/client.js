const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
var db_;
const connectDB = async () => {
  var uri = process.env.MONGODB_CONNECTION_STRING;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

  await client.connect(async (err, db) => {
    try {
      if (!err) db_ = await db?.db("TaskManagementDB");
    } catch (e) {}
  });
};
module.exports = { connectDB: connectDB, getDB: () => db_ };
