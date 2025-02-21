// Function to add a meeting to the log
function addMeeting() {
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

        // Save the meeting to localStorage
        saveMeetingToStorage(meetingEntry);
    } else {
        alert("Please enter both date and time.");
    }
}

// Function to save a meeting to localStorage
function saveMeetingToStorage(meetingEntry) {
    let meetings = JSON.parse(localStorage.getItem("meetings")) || [];
    meetings.push(meetingEntry);
    localStorage.setItem("meetings", JSON.stringify(meetings));
}

// Function to load meetings from localStorage
function loadMeetingsFromStorage() {
    const log = document.getElementById("meeting-log");
    const meetings = JSON.parse(localStorage.getItem("meetings")) || [];

    meetings.forEach((meeting) => {
        const newEntry = document.createElement("li");
        newEntry.textContent = meeting;
        log.appendChild(newEntry);
    });
}

// Function to reset the meeting history
function resetHistory() {
    const log = document.getElementById("meeting-log");
    log.innerHTML = ""; // Clear the displayed log
    localStorage.removeItem("meetings"); // Clear the stored meetings
    alert("Meeting history has been reset.");
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
    loadMeetingsFromStorage(); // Load saved meetings when the page loads

    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector("nav ul");

    menuToggle.addEventListener("click", function () {
        nav.classList.toggle("active");
    });
});