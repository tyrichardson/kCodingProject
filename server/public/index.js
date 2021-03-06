"use strict";

console.log("script.js connected ");

// dashboard variables
const guestName = document.getElementById("select-guest-message-code");
const guestInfo = document.getElementById("guest-information-p");
const messageType = document.getElementById("select-guest-message-type");
const customMessage = document.getElementById("custom-message-input");
const customMessageDiv = document.getElementById("div-custom-message");

const showGuestInfoButton = document.getElementById("button-guest-information");
const previewMessageButton = document.getElementById("button-preview-message");
const sendMessageButton = document.getElementById("button-send-message");

// modal variables
const previewMessageText = document.getElementById("modal-message-text");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");

// initialize state
function init() {
  guestName.value = "Select";
  messageType.value = "Select";
  customMessage.value = "";
  customMessageDiv.classList.add("hidden");
  sendMessageButton.classList.add("hidden");
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

init();

sendMessageButton.addEventListener("click", function () {
  init();
  alert("The message has been sent to your guest.");
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
