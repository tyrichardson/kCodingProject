"use strict";

let companiesArray = require("../public/Companies.json");

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
