// Get references to DOM elements and an audio file for the alarm sound
let hour_hand = document.querySelector(".hour_hand"); // Get the hour hand element
let minute_hand = document.querySelector(".minute_hand"); // Get the minute hand element
let second_hand = document.querySelector(".second_hand"); // Get the second hand element
let digital_clock = document.querySelector(".digital_clock"); // Get the digital clock display element
let selectData = document.querySelectorAll('select'); // Get all the select elements on the page
let set_alarm = document.querySelector(".set_alarm"); // Get the set/clear alarm button element
let ring = new Audio(url = "AlarmClock.github.io/music/tune.mp3"); // Create an Audio object for the alarm sound

// Populate the hour, minute, and AM/PM select dropdowns with options
for (let index = 12; index >= 1; index--) {
    index <= 9 ? index = `0${index}` : index = index; // Pad single-digit numbers with a leading zero
    let option = `<option value = "${index}">${index}</option>`; // Create an option element
    selectData[0].firstElementChild.insertAdjacentHTML("afterend", option); // Insert the option into the first select element
}

for (let index = 59; index >= 1; index--) {
    index <= 9 ? index = `0${index}` : index = index; // Pad single-digit numbers with a leading zero
    let option = `<option value = "${index}">${index}</option>`; // Create an option element
    selectData[1].firstElementChild.insertAdjacentHTML("afterend", option); // Insert the option into the second select element
}

for (let index = 0; index < 2; index++) {
    let ampm;
    index == 1 ? ampm = "AM" : ampm = "PM"; // Determine whether it's AM or PM
    let option = `<option value = "${ampm}">${ampm}</option>`; // Create an option element
    selectData[2].firstElementChild.insertAdjacentHTML("afterend", option); // Insert the option into the third select element
}

let isAlarm, timeSet; // Variables to track the alarm state and time

// Update the clock display and handle the alarm logic
setInterval(() => {
    let date = new Date();

    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    let hour_rotate = 30 * hour + minute / 2; // Calculate the rotation angle for the hour hand
    let minute_rotate = 6 * minute; // Calculate the rotation angle for the minute hand
    let second_rotate = 6 * second; // Calculate the rotation angle for the second hand

    hour_hand.style.transform = `rotate(${hour_rotate}deg)`; // Rotate the hour hand
    minute_hand.style.transform = `rotate(${minute_rotate}deg)`; // Rotate the minute hand
    second_hand.style.transform = `rotate(${second_rotate}deg)`; // Rotate the second hand

    // Display the current time in digital format
    let options = {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
    };
    digital_clock.innerHTML = date.toLocaleTimeString(undefined, options);

    let ampm = "AM";
    if (hour >= 12) {
        hour = hour - 12;
        ampm = "PM";
    }

    // Pad single-digit hours and minutes with leading zeros
    (hour <= 9) ? hour = `0${hour}` : hour = hour;
    (minute <= 9) ? minute = `0${minute}` : minute = minute;

    // Check if the alarm time matches the current time and play the alarm sound
    if (isAlarm === `${hour}:${minute} ${ampm}`) {
        ring.play();
    }
}, 1000);


set_alarm.addEventListener('click', () => {
    if (timeSet) {
        ring.pause(); // Pause the alarm sound
        isAlarm = ""; // Clear the alarm time
        selectData.forEach((items) => {
            items.classList.remove("disabled"); // Remove the "disabled" class from select elements
        });
        set_alarm.innerText = "Set Alarm"; // Change the button text to "Set Alarm"
        return (timeSet = false); // Set the alarm state to false
    }
    let time = `${selectData[0].value}:${selectData[1].value} ${selectData[2].value}`;
    isAlarm = time; // Set the alarm time
    timeSet = true; // Set the alarm state to true
    selectData.forEach((items) => {
        items.classList.add("disabled"); // Add the "disabled" class to select elements
    });
    set_alarm.innerText = "Clear Alarm"; // Change the button text to "Clear Alarm"
});
