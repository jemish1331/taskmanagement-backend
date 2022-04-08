const { MongoClient, ServerApiVersion } = require("mongodb");
var db_;
const uri =
  "mongodb+srv://jemish1331:9825354998@cluster0.qstev.mongodb.net/TaskManagementDB?retryWrites=true&w=majority";
const connectDB = async () => {
  var uri =
    "mongodb+srv://jemish1331:9825354998@cluster0.qstev.mongodb.net/test";
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

  await client.connect(async (err, db) => {
    try {
      console.log(err);
      if (!err) db_ = await db?.db("TaskManagementDB");
    } catch (e) {
      console.log(e);
    }
  });
};
module.exports = { connectDB: connectDB, getDB: () => db_ };
