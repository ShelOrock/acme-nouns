const express = require("express");
// const chalk = require("chalk");
const PORT = 3000;
const app = express();
const path = require("path");
const { syncAndSeed, findPersons, findPlaces, findThings } = require("./db");

app.get("/", async (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, "index.html"));
  } catch (ex) {
    console.log("index: " + ex.message);
    next(ex);
  }
});

app.get("/api/place", (req, res, next) => {
  return findPlaces().then(data => res.send(data));
});
app.get("/api/person", (req, res, next) => {
  return findPersons().then(data => res.send(data));
});
app.get("/api/things", (req, res, next) => {
  findThings().then(data => res.send(data));
});

syncAndSeed();

app.listen(PORT, () => {
  console.log("Listening");
});
