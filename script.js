function addMeeting() {
    const log = document.getElementById("meeting-log");
    const dateTime = new Date().toLocaleString();
    const newEntry = document.createElement("li");
    newEntry.textContent = `Meeting on ${dateTime}`;
    log.appendChild(newEntry);
}

function addImage() {
    const gallery = document.getElementById("gallery-container");
    const imageInput = document.createElement("input");
    imageInput.type = "file";
    imageInput.accept = "image/*";
    imageInput.onchange = function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
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
        const newEntry = document.createElement("li");
        newEntry.textContent = `Meeting on ${date} at ${formattedTime}`;
        log.appendChild(newEntry);
    } else {
        alert("Please enter both date and time.");
    }
}
