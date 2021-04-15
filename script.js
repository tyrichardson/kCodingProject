"use strict";
// console.log("js connected");

// select options variables
const guestName = document.getElementById("select-guest-message-name");
const locale = document.getElementById("select-guest-message-location");
const roomNumber = document.getElementById("select-guest-message-room-number");
const messageType = document.getElementById("select-guest-message-type");
const previewMessageButton = document.getElementById("button-preview-message");
const sendMessageButton = document.getElementById("button-send-message");

// modal variables
const previewMessageText = document.getElementById("modal-message-text");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");

// initialize state
function init() {
  sendMessageButton.classList.add("hidden");
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

init();
getGuestNameObject();
getLocaleObject();
getRoomNumberObject();
getMessageTypeObject();

// select values
let guestNameValue = document.getElementById("select-guest-message-name").value;
let localeValue = document.getElementById("select-guest-message-location")
  .value;
let roomNumberValue = document.getElementById(
  "select-guest-message-room-number"
).value;
let messageTypeValue = document.getElementById("select-guest-message-type")
  .value;

console.log(
  `${guestNameValue}, ${localeValue}, ${roomNumberValue}, ${messageTypeValue}`
);

// get options for selects
async function getGuestNameObject(event) {
  const res = await fetch("Guests.json");
  const resJson = await res.json();
  let guestOptionsArray = resJson;
  for (let i = 0; i < guestOptionsArray.length; i++) {
    const option = document.createElement("option");
    option.value = `${guestOptionsArray[i].firstName} ${guestOptionsArray[i].lastName}`;
    option.innerHTML = `${guestOptionsArray[i].firstName} ${guestOptionsArray[i].lastName}`;
    guestName.appendChild(option);
  }
}
async function getLocaleObject(event) {
  const res = await fetch("Companies.json");
  const resJson = await res.json();
  let localOptionsArray = resJson;
  for (let i = 0; i < localOptionsArray.length; i++) {
    const option = document.createElement("option");
    option.value = `${localOptionsArray[i].company}, ${localOptionsArray[i].city}`;
    option.innerHTML = `${localOptionsArray[i].company}, ${localOptionsArray[i].city}`;
    locale.appendChild(option);
  }
}
async function getRoomNumberObject(event) {
  const res = await fetch("Guests.json");
  const resJson = await res.json();
  let roomNumberOptionsArray = resJson;
  for (let i = 0; i < roomNumberOptionsArray.length; i++) {
    let reservationDate = new Date(
      roomNumberOptionsArray[i].reservation.startTimestamp
    );
    const option = document.createElement("option");
    option.value = `Room #${
      roomNumberOptionsArray[i].reservation.roomNumber
    }; ${reservationDate.toDateString()}`;
    option.innerHTML = `Room #${
      roomNumberOptionsArray[i].reservation.roomNumber
    }; ${reservationDate.toDateString()}`;
    roomNumber.appendChild(option);
  }
}
async function getMessageTypeObject(event) {
  const res = await fetch("Messages.json");
  const resJson = await res.json();
  let messageTypeOptionsArray = resJson;
  for (let i = 0; i < messageTypeOptionsArray.length; i++) {
    const option = document.createElement("option");
    option.value = `${messageTypeOptionsArray[i].type}`;
    option.innerHTML = `${messageTypeOptionsArray[i].type}`;
    messageType.appendChild(option);
  }
}

// event listener/handler for message text preview
previewMessageButton.addEventListener("click", function (e) {
  e.preventDefault();
  guestNameValue = document.getElementById("select-guest-message-name").value;
  localeValue = document.getElementById("select-guest-message-location").value;
  roomNumberValue = document.getElementById("select-guest-message-room-number")
    .value;
  messageTypeValue = document.getElementById("select-guest-message-type").value;
  if (
    guestNameValue !== "Select" &&
    localeValue !== "Select" &&
    roomNumberValue !== "Select" &&
    messageTypeValue !== "Select"
  ) {
    let previewText = `${guestNameValue}, ${localeValue}, ${roomNumberValue}, ${messageTypeValue}`;
    console.log(previewText);

    previewMessageText.textContent = previewText;
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
  } else {
    alert("Please select information for each item listed.");
  }
});

// event listeners/handlers for modal and overlay
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function (e) {
  e.preventDefault();
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  sendMessageButton.classList.remove("hidden");
};

function overlayCloseModal(e) {
  e.preventDefault();
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  sendMessageButton.classList.remove("hidden");
}

btnCloseModal.addEventListener("click", closeModal);

overlay.addEventListener("click", overlayCloseModal);

document.addEventListener("keydown", function (e) {
  if (e.key == "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
