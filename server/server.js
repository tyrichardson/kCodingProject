"use strict";

const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.static("./server/public"));

let messagesArray = require("./public/Messages.json");
let guestObjectsArray = require("./modules/guestObjectArray");

console.log("messagesArrayPull ", messagesArray);

app.get("/guests", (req, res) => {
  try {
    res.send(guestObjectsArray);
  } catch (err) {
    console.log(err);
  }
});

app.get("/messages", (req, res) => {
  try {
    res.send(messagesArray);
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => {
  console.log("express listening on PORT ", PORT);
});
