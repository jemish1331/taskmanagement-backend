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
    return {
      ...val,
      subTask: subTaskResponse.filter((value) => {
        return value.parentTaskID === val._id.toString();
      }),
    };
  });

  res.send(response);
});

app.post("/create-task", (req, res) => {
  connectDB.getDB().collection("TaskDB").insertOne({
    taskTitle: req.body.taskTitle,
    taskDescription: req.body.taskDescription,
    dateAndTime: req.body.dateAndTime,
  });
  res.send("Task added successfully");
});

app.post("/add-subtask", (req, res) => {
  connectDB.getDB().collection("SubTaskDB").insertMany(req.body);
  res.send("SubTask added successfully");
});
app.listen(3000);
