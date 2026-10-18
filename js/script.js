function updateDateTime() { //footer sclock script
    const now = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hours: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    const clockEL = document.getElementById('clock');
    if (clockEL) {
        clockEL.textContent = now.toLocaleTimeString('en-US', options);
    }
}

function iniDataHarvester(){ //data harvester script
    const now = new Date(); //log event time
    const timeInput = document.getElementById("visitor-time");
    if (timeInput) timeInput.value = now.toLocaleString();

    let os = "Unknown OS"; //detect OS and phone type
    let device = "Desktop/ Laptop";
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/windows phone/i.test(userAgent)) {
        os = "Windows Phone";
        device = "Mobile";
    } else if (/android/i.test(userAgent)) {
        os = "Android";
        device = "Mobile";
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        os = "iOS";
        device = "Mobile";
    } else if (/Macintosh/i.test(userAgent)) {
        os = "Mac OS";
    } else if (/Windows/i.test(userAgent)) {
        os = "Windows";
    } else if (/Linux/i.test(userAgent)) {
        os = "Linux";
    }

    const osInput = document.getElementById("visitor-os");
    const deviceInput = document.getElementById("visitor-device");
    if (osInput) osInput.value = os;
    if (deviceInput) deviceInput.value = device;

    fetch ("https://ipapi.co") //get IP and Geo location from free API
        .then(response => response.json())
        .then(data => {
            const ipInput = document.getElementById("visitor-ip");
            const locInput = document.getElementById("visitor-location");
            if (ipInput) ipInput.value = data.ip || "Unknown IP";
            if (locInput) locInput.value = `${data.city}, ${data.region}, ${data.country_name}` || "Unknown Location";
        })
    }
    .catch(error => {
        console.error("Error fetching IP and location data:", error);
        const ipInput = document.getElementById("visitor-ip");
        const locInput = document.getElementById("visitor-location");
        if (ipInput) ipInput.value = "Unknown IP";
        if (locInput) locInput.value = "Unknown Location";
    });
}

document.addEventListener("DOMContentLoaded"), function() {
    updateDateTime();
    setInterval(updateDateTime, 1000);
    iniDataHarvester();
});