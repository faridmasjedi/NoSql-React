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
  console.log("\n---\nall - index:", info, "\n---\n");
  res.send(info);
});

server.post("/artist/add", (req, res) => {
  let { name, age } = req.body;
  let info = [name, age];
  console.log("\n---\nadd - server:", info, "\n---\n");
  database.create(info);
  res.send(database.all());
});

server.post("/artist/edit", (req, res) => {
  let { Id, name, age } = req.body;
  let data = database.find(Id);
  name = name || data.name;
  age = age || data.age;
  let info = { Id, name, age };
  console.log("\n---\nedit - server:", info, "\n---\n");
  database.update(info);
});

server.post("/artist/remove", (req, res) => {
  let info = req.body;
  console.log("\n---\nremove - server:", info, "\n---\n");
  database.remove(info);
});

server.post("/artist/search", (req, res) => {
  let { valArr, varArr } = req.body;

  let searchResult;
  if (valArr.length) {
    searchResult = database.findBySomeColumns(varArr, valArr);
  } else {
    searchResult = database.all();
  }
  console.log("\n---\nserver - search : ", searchResult, "\n---\n");
  res.send(searchResult);
});

server.listen(PORT, () =>
  console.log(
    `\n---\nThe link to the port is : http://localhost:${PORT}\n---\n`
  )
);
