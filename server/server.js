const express = require("express");
const server = express();
const noSql = require("./data");
const bodyParser = require("body-parser");
const cors = require("cors");
const database = new noSql("artist", ["name", "age"]);
database.create(["", ""]);

const PORT = 2357;
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cors());
server.use(express.json());

server.get("/artists", (req, res) => {
  let info = database.all();
  console.log("all - index:", info);
  res.send(info);
});

server.post("/artist/add", (req, res) => {
  let { name, age } = req.body;
  let info = [name, age];
  console.log("add - server:", info);
  database.create(info);
  res.send(database.all());
});

server.post("/artist/edit", (req, res) => {
  let { Id, name, age } = req.body;
  let data = database.find(Id);
  name = name || data.name;
  age = age || data.age;
  let info = { Id, name, age };
  console.log("edit - server:", info);
  database.update(info);
});

server.post("/artist/remove", (req, res) => {
  let info = req.body;
  console.log("remove - server:", info);
  database.remove(info);
});
server.listen(PORT, () => console.log(`http://localhost:${PORT}`));
