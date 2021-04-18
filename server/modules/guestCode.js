"use strict";

function guestCode(array) {
  let guestCodeArray = [];
  for (let i = 0; i < array.length; i++) {
    let eTS = array[i].reservation.endTimestamp.toString();
    let guestCodeValue = array[i].firstName + array[i].lastName + eTS.slice(-4);
    guestCodeArray.push(guestCodeValue);
  }
  return guestCodeArray;
}

module.exports = guestCode;
