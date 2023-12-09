const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const mongoose = require("./config/mongoose");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static(path.join(__dirname + "/public")));
// app.use("/", router);

app.listen(port, (err) => {
  if (!err) {
    console.log(`connected to port: ${port}`);
  } else {
    console.log(err);
  }
});
