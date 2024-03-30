const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/v1", userRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is working fine",
  });
});

app.listen(3000, () => {
  console.log("Server is on 3000");
});
