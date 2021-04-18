"use strict";

let guestArray = require("../public/Guests.json");
// let companiesArray = require("../public/Companies.json");

let Guest = require("./GuestClass");
let guestCode = require("./guestCode");

// a unique value per reservation
let guestCodeArray = guestCode(guestArray);

let guestObjectsArray = [];

for (let i = 0; i < guestCodeArray.length; i++) {
  let gCode = guestCodeArray[i];
  gCode = new Guest(
    gCode,
    guestArray[i].id,
    guestArray[i].firstName,
    guestArray[i].lastName,
    guestArray[i].reservation.roomNumber
  );
  guestObjectsArray.push(gCode);
  for (let el of guestObjectsArray) {
    el.setLocation();
  }
}

module.exports = guestObjectsArray;
