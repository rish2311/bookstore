const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  title: String,
  imageUrl: String,
  price: String,
  condition: String,
});
