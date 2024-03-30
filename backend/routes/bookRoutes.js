const express = require("express");
const app = express();

app.get("/home", (req, res) => {
  res.send("");
});

app.get("/browse", (req, res) => {
  res.send("");
});

app.get("/buy", (req, res) => {
  res.send("");
});

app.get("/sell", (req, res) => {
  res.send("");
});
