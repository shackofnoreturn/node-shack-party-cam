document.addEventListener('DOMContentLoaded', () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/get_image_list', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            const imageList = JSON.parse(xhr.responseText);
            displayImages(imageList); // Move the displayImages call here
        }
    };
    xhr.send();
});

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
