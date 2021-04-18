"use strict";

//let guestArray = require("../public/Guests.json");
let companiesArray = require("../public/Companies.json");
//let messagesArray = require("../public/Messages.json");
//let guestCode = require("./guestCode");

class Guest {
  constructor(gCode, id, firstName, lastName, roomNumber) {
    this.gCode = gCode;
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.roomNumber = roomNumber;
  }

  setLocation() {
    companiesArray.find((el) => {
      if (el.id == this.id) {
        this.company = el.company;
        this.city = el.city;
        this.timezone = el.timezone;
      }
    });
  }
}

module.exports = Guest;
