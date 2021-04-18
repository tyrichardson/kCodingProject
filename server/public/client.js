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
    showGuestInfoButton.addEventListener("click", function (e) {
      e.preventDefault();
      let guestCode = guestName.value;
      arr = guestArrayPull.find((el) => el.gCode == guestCode);
      console.log("arr ", arr);
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

    // event listener/handler for preview message button/message preview text on modal
    previewMessageButton.addEventListener("click", function (e) {
      e.preventDefault();
      let guestCodeValue = guestName.value;
      let messageTypeValue = messageType.value;
      let currentDate = new Date();
      let currentHour = currentDate.getHours();
      console.log("date & hours ", currentDate, currentHour);
      let timeOfDay;
      if (currentHour > 17) {
        timeOfDay = "evening";
      } else if (currentHour >= 12) {
        timeOfDay = "afternoon";
      } else {
        timeOfDay = "morning";
      }
      console.log("timeOfDay ", timeOfDay);

      if (guestCodeValue !== "Select" && messageTypeValue !== "Select") {
        let msg = messagesArrayPull.find((el) => el.type == messageTypeValue);

        // TODO: get variables into msg.message string for display
        let previewText = `${msg.message}`;

        previewMessageText.textContent = previewText;
        modal.classList.remove("hidden");
        overlay.classList.remove("hidden");
      } else {
        alert("Please select guest code and message type.");
      }
    });
  });
});
