// Load Google's OAuth Client Library
function handleClientLoad() {
    gapi.load("client:auth2", initClient);
}

// Initialize the Google API client
function initClient() {
    gapi.client.init({
        clientId: "841283416700-ck0tgema93pjal7alradlc9pb82ggi3c.apps.googleusercontent.com",
        clientSecret: "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",
        discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
        scope: "https://www.googleapis.com/auth/spreadsheets"
    }).then(() => {
        console.log("Google API Client Initialized");
    }).catch(error => {
        console.error("Error initializing Google API client:", error);
    });
}

// Authenticate and fetch meeting log from Google Sheets
function fetchGoogleSheet() {
    gapi.auth2.getAuthInstance().signIn().then(() => {
        gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: "1JciD2DbOqQ4fS-LcTFS_AlW_xLksYdmHNKziFl87Z48",
            range: "Meetings!A1:D"
        }).then(response => {
            displayMeetingLogs(response.result.values);
        }).catch(error => {
            console.error("Error fetching meeting logs:", error);
        });
    });
}

// Display meeting logs in the HTML table
function displayMeetingLogs(data) {
    const table = document.getElementById("meetingTable");
    table.innerHTML = "<tr><th>Date</th><th>Time</th><th>Notes</th></tr>";
    data.forEach(row => {
        let tr = document.createElement("tr");
        row.forEach(cell => {
            let td = document.createElement("td");
            td.textContent = cell;
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });
}

// Add a new meeting log entry
function addMeeting() {
    const date = document.getElementById("meetingDate").value;
    const time = document.getElementById("meetingTime").value;
    const notes = document.getElementById("meetingNotes").value;

    if (!date || !time || !notes) {
        alert("Please fill in all fields");
        return;
    }

    gapi.auth2.getAuthInstance().signIn().then(() => {
        const values = [[date, time, notes]];
        gapi.client.sheets.spreadsheets.values.append({
            spreadsheetId: "1JciD2DbOqQ4fS-LcTFS_AlW_xLksYdmHNKziFl87Z48",
            range: "Meetings!A1:C",
            valueInputOption: "RAW",
            resource: { values }
        }).then(() => {
            console.log("Meeting added successfully");
            fetchGoogleSheet();
        }).catch(error => {
            console.error("Error adding meeting:", error);
        });
    });
}

// Reset the meeting log (clear all data)
function resetMeetingLog() {
    gapi.auth2.getAuthInstance().signIn().then(() => {
        gapi.client.sheets.spreadsheets.values.clear({
            spreadsheetId: "1JciD2DbOqQ4fS-LcTFS_AlW_xLksYdmHNKziFl87Z48",
            range: "Meetings!A1:D"
        }).then(() => {
            console.log("Meeting log cleared successfully");
            fetchGoogleSheet();
        }).catch(error => {
            console.error("Error clearing meeting log:", error);
        });
    });
}

// Mobile menu toggle functionality
document.addEventListener("DOMContentLoaded", function () {
    loadMeetings(); // Load saved meetings when the page loads

    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector("nav ul");

    menuToggle.addEventListener("click", function () {
        nav.classList.toggle("active");
    });

    // Reset the meeting log (clear all data)
    function resetMeetingLog() {
        gapi.auth2.getAuthInstance().signIn().then(() => {
            gapi.client.sheets.spreadsheets.values.clear({
                spreadsheetId: "1JciD2DbOqQ4fS-LcTFS_AlW_xLksYdmHNKziFl87Z48",
                range: "Meetings!A1:D"
            }).then(() => {
                console.log("Meeting log cleared successfully");
                fetchGoogleSheet();
            }).catch(error => {
                console.error("Error clearing meeting log:", error);
            });
        });
    }

    // Load client library on window load
    window.onload = handleClientLoad;
});

// JavaScript to toggle the mobile menu
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});