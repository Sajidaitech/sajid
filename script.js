const API_KEY = "AIzaSyAkFdt_KpmazT8Jgs6piopY7QcRpAuJm0A"; // Your Google Sheets API Key
const SHEET_ID = "1JciD2DbOqQ4fS-LcTFS_AlW_xLksYdmHNKziFl87Z48"; // Your Google Sheet ID

// Function to add a meeting to the log
async function addMeeting() {
    const date = document.getElementById("meeting-date").value;
    let time = document.getElementById("meeting-time").value;
    const ampm = document.getElementById("meeting-ampm").value;
    const log = document.getElementById("meeting-log");

    if (date && time) {
        let [hours, minutes] = time.split(":");
        hours = parseInt(hours);

        if (ampm === "PM" && hours < 12) {
            hours += 12;
        } else if (ampm === "AM" && hours === 12) {
            hours = 0;
        }

        const formattedTime = `${String(hours).padStart(2, "0")}:${minutes} ${ampm}`;
        const meetingEntry = `Meeting on ${date} at ${formattedTime}`;

        // Create a new list item
        const newEntry = document.createElement("li");
        newEntry.textContent = meetingEntry;
        log.appendChild(newEntry);

        // Save the meeting to Google Sheets
        await saveMeetingToSheet(date, time, ampm, meetingEntry);
    } else {
        alert("Please enter both date and time.");
    }
}

// Function to save a meeting to Google Sheets
async function saveMeetingToSheet(date, time, ampm, meetingEntry) {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1!A1:D1:append?valueInputOption=USER_ENTERED`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
            values: [[date, time, ampm, meetingEntry]],
        }),
    });

    if (!response.ok) {
        alert("Failed to save meeting. Please try again.");
    }
}

// Function to load meetings from Google Sheets
async function loadMeetings() {
    const log = document.getElementById("meeting-log");
    log.innerHTML = "";

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1!A2:D?key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.values) {
        data.values.forEach((row) => {
            const newEntry = document.createElement("li");
            newEntry.textContent = row[3]; // Meeting Entry is in the 4th column
            log.appendChild(newEntry);
        });
    }
}

// Function to reset the meeting history
async function resetHistory() {
    const log = document.getElementById("meeting-log");
    log.innerHTML = "";

    // Clear all rows in the sheet (except the header)
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1!A2:D?key=${API_KEY}`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
            values: [],
        }),
    });

    if (response.ok) {
        alert("Meeting history has been reset.");
    } else {
        alert("Failed to reset history. Please try again.");
    }
}

// Function to add an image to the gallery
function addImage() {
    const gallery = document.getElementById("gallery-container");
    const imageInput = document.createElement("input");
    imageInput.type = "file";
    imageInput.accept = "image/*";
    imageInput.onchange = function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const img = document.createElement("img");
                img.src = e.target.result;
                img.style.width = "200px";
                img.style.margin = "10px";
                gallery.appendChild(img);
            };
            reader.readAsDataURL(file);
        }
    };
    imageInput.click();
}

// Back-to-top button functionality
const backToTopButton = document.getElementById("backToTop");

window.onscroll = function () {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        backToTopButton.classList.add("visible");
    } else {
        backToTopButton.classList.remove("visible");
    }
};

backToTopButton.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// Mobile menu toggle functionality
document.addEventListener("DOMContentLoaded", function () {
    loadMeetings(); // Load saved meetings when the page loads

    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector("nav ul");

    menuToggle.addEventListener("click", function () {
        nav.classList.toggle("active");
    });
});