"use strict";

console.log("client.js connected.");

$(document).ready(function () {
  console.log("jQuery ready.");

  let guestArrayPull = [];
  let messagesArrayPull = [];
  let arr;

  function getGuestArray() {
    try {
      return $.getJSON("/guests");
    } catch (err) {
      console.log(err);
    }
  }
  $.when(getGuestArray()).then(function (data) {
    for (let i = 0; i < data.length; i++) {
      guestArrayPull.push(data[i]);
    }
    console.log("guestArrayPull ", guestArrayPull);
    // populate guest reservation code select
    for (let i = 0; i < guestArrayPull.length; i++) {
      const option = document.createElement("option");
      option.value = `${guestArrayPull[i].gCode}`;
      option.innerHTML = `${guestArrayPull[i].gCode}`;
      guestName.appendChild(option);
    }

    function getMessagesArray() {
      try {
        return $.getJSON("/messages");
      } catch (err) {
        console.log(err);
      }
    }
    $.when(getMessagesArray()).then(function (dataArray) {
      for (let i = 0; i < dataArray.length; i++) {
        messagesArrayPull.push(dataArray[i]);
      }
      console.log("messagesArrayPull ", messagesArrayPull);
      // populate message type select
      for (let i = 0; i < messagesArrayPull.length; i++) {
        const option = document.createElement("option");
        option.value = `${messagesArrayPull[i].type}`;
        option.innerHTML = `${messagesArrayPull[i].type}`;
        messageType.appendChild(option);
      }
    });

    // event listener/handler for show guest info button/guest reservation information on dashboard
    $("#select-guest-message-code").change(function () {
      let guestCode = guestName.value;
      arr = guestArrayPull.find((el) => el.gCode == guestCode);
      if (!arr.company || !arr.city) {
        alert(
          "There is missing information in your guest's reservation file! Please seek remediation!"
        );
        guestName.value = "";
        guestInfo.textContent = "";
      } else {
        guestInfo.textContent = `${arr.firstName} ${arr.lastName} in Room ${arr.roomNumber} at ${arr.company} in ${arr.city}`;
      }
    });

    // event listener/handler for custom message selection
    $("#select-guest-message-type").change(function () {
      if (guestName.value != "Select" && messageType.value == "Custom") {
        customMessageDiv.classList.remove("hidden");
      }
    });

    // event listener/handler for preview message button/message preview text on modal
    previewMessageButton.addEventListener("click", function (e) {
      e.preventDefault();
      let guestCodeValue = guestName.value;
      let messageTypeValue = messageType.value;
      let customMessageValue = customMessage.value;
      let msg;
      let msgMessage;
      let currentDate = new Date();
      let currentHour = currentDate.getHours();
      let timeOfDay;
      let previewText;
      if (currentHour > 17) {
        timeOfDay = "evening";
      } else if (currentHour >= 12) {
        timeOfDay = "afternoon";
      } else {
        timeOfDay = "morning";
      }
      let templater = function (message, array, time) {
        msg = message
          .replaceAll("<", "&lt")
          .replaceAll(">", "&gt")
          .replace("timeOfDay", time)
          .replace("firstName", array.firstName)
          .replace("lastName", array.lastName)
          .replace("roomNumber", array.roomNumber)
          .replace("company", array.company)
          .replace("city", array.city);
        console.log("temp msg ", msg);
        return msg;
      };

      if (guestCodeValue == "Select" || messageTypeValue == "Select") {
        alert("Please select guest code and message type.");
      } else if (messageTypeValue == "Custom") {
        customMessageDiv.classList.remove("hidden");
        previewText = templater(customMessageValue, arr, timeOfDay);

        previewMessageText.textContent = previewText;
        modal.classList.remove("hidden");
        overlay.classList.remove("hidden");
      } else {
        msg = messagesArrayPull.find((el) => el.type == messageTypeValue);
        msgMessage = msg.message;
        previewText = templater(msgMessage, arr, timeOfDay);

        previewMessageText.textContent = previewText;
        modal.classList.remove("hidden");
        overlay.classList.remove("hidden");
      }
    });
  });
});
