
// Set constraints for the video stream
var constraints = { video: { facingMode: "user" }, audio: false };
var track = null;

// Defining HTML elements
const cameraView  = document.querySelector("#camera--view"),
    cameraOutput  = document.querySelector("#camera--output"),
    cameraSensor  = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger");   

// Access the device camera and stream to cameraView
async function startCamera() {
    await navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
            track = stream.getTracks()[0];
            cameraView.srcObject = stream;
        })
        .catch(function(error) {
            console.error("Something is broken.", error);
        });
}

// Take a picture when cameraTrigger is tapped
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

// Start camera when page loads
window.onload = startCamera;