const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./db/client");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app?.use(express.json());
connectDB.connectDB();

app.get("/list-task", async (req, res) => {
  let response;
  let subTaskResponse;

  await connectDB
    .getDB()
    .collection("TaskDB")
    .find()
    .toArray()
    .then((res) => (response = res));

  await connectDB
    .getDB()
    .collection("SubTaskDB")
    .find()
    .toArray()
    .then((res) => (subTaskResponse = res));

  response = response.map((val) => {
    let subTask = subTaskResponse.filter((value) => {
      return value.parentTaskID === val._id.toString();
    });
    return {
      ...val,
      subTask: subTask,
    };
  });

  res.send(response);
});

app.post("/create-task", (req, res) => {
  connectDB.getDB().collection("TaskDB").insertOne({
    taskTitle: req.body.taskTitle,
    taskDescription: req.body.taskDescription,
    dateAndTime: req.body.dateAndTime,
    status: req?.body?.status,
  });
  res.send("Task added successfully");
});

app.post("/add-subtask", (req, res) => {
  connectDB.getDB().collection("SubTaskDB").insertOne(req.body);
  connectDB
    .getDB()
    .collection("TaskDB")
    .updateOne(
      { _id: req.body?.parentTaskID },
      { $set: { status: "In Progress" } }
    );
  res.send("SubTask added successfully");
});

app.post("/change-status", (req, res) => {
  connectDB
    .getDB()
    .collection("TaskDB")
    .updateOne(
      { _id: req.body?.taskID },
      { $set: { status: req?.body?.status } }
    );
  res.send("Status Updated successfully");
});

app.listen(process.env.PORT || 5000);
