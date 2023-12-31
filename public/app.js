
// Set constraints for the video stream
var constraints = { video: { facingMode: "user" }, audio: false };

// Defining HTML elements
const cameraView  = document.querySelector("#camera--view"),
    cameraOutput  = document.querySelector("#camera--output"),
    cameraSensor  = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger");   

// Access the device camera and stream to cameraView
async function startCamera() {
    const stream = await navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
            cameraView.srcObject = stream;
        })
        .catch(function(error) {
            console.error("Something is broken.", error);
        });
}

// Take a picture when cameraTrigger is tapped
// TODO - Simulate flash by lighting up screen
cameraTrigger.addEventListener('click', async () => {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp");
    cameraOutput.classList.add("taken");
    
    const canvas = document.createElement('canvas');
    canvas.width = cameraView.videoWidth;
    canvas.height = cameraView.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(cameraView, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL('image/jpeg');

    const response = await fetch('/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: imageData })
    });

    if (response.ok) {
        console.log('Photo sent successfully!');
    } else {
        console.error('Failed to send photo.');
    }
});

const loadingScreen = document.querySelector(".loading-screen");
// Wait for a minimum display time
setTimeout(() => {
    loadingScreen.classList.add("hidden"); // Apply fade-out effect
}, 5000); // Minimum display time in milliseconds

// Start camera when page loads
window.onload = startCamera;