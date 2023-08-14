// Set constraints for the video stream
var constraints = { video: { facingMode: "user" }, audio: false };
var track = null;

// Define constants
const cameraView  = document.querySelector("#camera--view"),
    cameraOutput  = document.querySelector("#camera--output"),
    cameraSensor  = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger");   

// Access the device camera and stream to cameraView
function startCamera() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
            track = stream.getTracks()[0];
            cameraView.srcObject = stream;
        })
        .catch(function(error) {
            console.error("Something is broken.", error);
        });
}

// Start the video stream when the window loads
window.addEventListener("load", startCamera, false);



  fetch("http://localhost:3000/upload", {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
    },
    body: "HELLOOO",
  })
    .then(response => response.text())
    .then(data => {
      console.log('Response from server:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });