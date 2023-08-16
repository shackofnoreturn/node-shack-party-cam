document.addEventListener("DOMContentLoaded", () => {
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
    cameraTrigger.onclick = function() {
        cameraSensor.width = cameraView.videoWidth;
        cameraSensor.height = cameraView.videoHeight;
        cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
        cameraOutput.src = cameraSensor.toDataURL("image/webp");
        cameraOutput.classList.add("taken");
    };

    // Start the video stream when the window loads
    window.addEventListener("load", startCamera, false);
});