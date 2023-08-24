document.addEventListener('DOMContentLoaded', () => {
    const slideshowContainer = document.getElementById('slideshow-container');
    const image1 = document.getElementById('image1');
    const image2 = document.getElementById('image2');
    
    /*
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/get_image_list', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            const imageList = JSON.parse(xhr.responseText);
            displayImages(imageList); // Move the displayImages call here
        }
    };
    xhr.send();

    function displayImages(imageList) {
        const imageContainer = document.getElementById('slideshow');

        imageList.forEach(imageName => {
            const img = document.createElement('img');
            img.src = 'captures/' + imageName;
            img.alt = imageName;
            imageContainer.appendChild(img);
        });

        console.log(imageList);
    }
    */


    function getRandomImage() {
        // Assuming this code is triggered when you want to get a random image
        fetch('/get_image_random')
            .then(response => response.json())
            .then(data => {
                // Handle the randomImage data here
                console.log(data); // Use the received data for your slideshow
                return 'captures/' + data;
            })
            .catch(error => {
                console.error('Error fetching random image:', error);
            });
    }

    function updateImages() {
        // Swap the image elements
        [image1.src, image2.src] = [image2.src, image1.src];
        [image1.alt, image2.alt] = [image2.alt, image1.alt];

        // Load a new random image into the hidden image element
        //image2.src = getRandomImage();

        // Assuming this code is triggered when you want to get a random image
        fetch('/get_image_random')
            .then(response => response.json())
            .then(data => {
                // Handle the randomImage data here
                console.log(data); // Use the received data for your slideshow
                image2.src = "captures/" + data;
            })
            .catch(error => {
                console.error('Error fetching random image:', error);
            });
    }

    function toggleImages() {
        image1.classList.toggle('visible');
        image2.classList.toggle('visible');
    }


    // Initial setup
    updateImages();

    // Set interval to change images every few seconds
    setInterval(() => {
        toggleImages();
        setTimeout(() => {
            updateImages();
            toggleImages();
        }, 1000); // Adjust the timing for transition
    }, 5000); // Change image every 5 seconds
});



