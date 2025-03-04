// Import Firebase modules using ES6 modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCSSt-CYX1fDM6cU-hxOW97W6TB4jKlvDQ",
    authDomain: "sajidmk-cc516.firebaseapp.com",
    projectId: "sajidmk-cc516",
    storageBucket: "sajidmk-cc516.firebasestorage.app",
    messagingSenderId: "412939132425",
    appId: "1:412939132425:web:400930d43c660acde762d8",
    measurementId: "G-K14MHTXYY1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Enable/Disable Edit Mode
document.getElementById('edit-mode-toggle').addEventListener('click', function () {
    const dateInput = document.getElementById('meeting-date');
    const timeInput = document.getElementById('meeting-time');
    const notesInput = document.getElementById('meeting-notes');
    const addButton = document.getElementById('add-meeting-button');
    const resetButton = document.getElementById('reset-history-button');

    if (dateInput.disabled) {
        dateInput.disabled = false;
        timeInput.disabled = false;
        notesInput.disabled = false;
        addButton.disabled = false;
        resetButton.disabled = false;
        this.textContent = 'Disable Edit Mode';
    } else {
        dateInput.disabled = true;
        timeInput.disabled = true;
        notesInput.disabled = true;
        addButton.disabled = true;
        resetButton.disabled = true;
        this.textContent = 'Enable Edit Mode';
    }
});

// Add Meeting to Firestore
async function addMeeting() {
    const date = document.getElementById('meeting-date').value;
    const time = document.getElementById('meeting-time').value;
    const notes = document.getElementById('meeting-notes').value;

    if (!date || !time) {
        alert('Please enter both date and time.');
        return;
    }

    try {
        await addDoc(collection(db, 'meetings'), { date, time, notes });
        alert('Meeting saved successfully!');
        displayMeetings(); // Refresh the meeting list
    } catch (error) {
        console.error('Error saving meeting: ', error);
    }

    // Clear input fields after adding
    document.getElementById('meeting-date').value = '';
    document.getElementById('meeting-time').value = '';
    document.getElementById('meeting-notes').value = '';
}

// Reset Meeting History in Firestore
async function resetHistory() {
    if (!confirm('Are you sure you want to reset the meeting history?')) return;

    try {
        const querySnapshot = await getDocs(collection(db, 'meetings'));
        querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
        });
        displayMeetings(); // Refresh the meeting list
    } catch (error) {
        console.error('Error resetting history: ', error);
    }
}

// Display Meetings from Firestore
async function displayMeetings() {
    const meetingLog = document.getElementById('meeting-log');
    if (!meetingLog) return;

    meetingLog.innerHTML = ''; // Clear existing content

    try {
        const querySnapshot = await getDocs(collection(db, 'meetings'));
        querySnapshot.forEach((doc, index) => {
            const data = doc.data();
            const li = document.createElement('li');
            li.textContent = `Meeting ${index + 1}: Date - ${data.date}, Time - ${data.time}, Notes - ${data.notes}`;
            meetingLog.appendChild(li);
        });
    } catch (error) {
        console.error('Error fetching meetings: ', error);
    }
}

// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", function () {
            navLinks.classList.toggle("active");
        });
    }
});

// Ensure elements exist before modifying them
document.addEventListener("DOMContentLoaded", function () {
    const dateInput = document.getElementById("meeting-date");
    const timeInput = document.getElementById("meeting-time");
    const notesInput = document.getElementById("meeting-notes");
    const addButton = document.getElementById("add-meeting-button");
    const resetButton = document.getElementById("reset-history-button");
    const meetingLog = document.getElementById("meeting-log");

    if (dateInput && timeInput && notesInput && addButton && resetButton && meetingLog) {
        // Add event listeners
        addButton.addEventListener("click", addMeeting);
        resetButton.addEventListener("click", resetHistory);

        // Load meetings on page load
        displayMeetings();
    } else {
        console.error("One or more elements are missing from the DOM.");
    }
});
// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", function () {
            navLinks.classList.toggle("active");
        });
    }
});
