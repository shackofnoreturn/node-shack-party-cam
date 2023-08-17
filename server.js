const express    = require("express");
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

// Defining constants
const app  = express();
const port = 3000;
const imageFolderPath = path.join(__dirname, '/public/captures');
const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

// Application configuration
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.static('public'));

// Upload endpoint
app.post("/upload", (req, res) => {
    const { image } = req.body;
    const base64Data = image.replace(/^data:image\/jpeg;base64,/, '');
    const filename = `captured_${Date.now()}.jpg`;

    fs.writeFile(filename, base64Data, 'base64', (err) => {
        if (err) {
            console.error('Error saving image:', err);
            res.status(500).send('Error saving image.');
        } else {
            console.log('Image saved:', filename);
            res.status(200).send('Image saved successfully.');
        }
    });
});

app.get('/captures/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    const imagePath = path.join(__dirname, 'captures', imageName);
    res.sendFile(imagePath);
});

app.get('/get_image_list', (req, res) => {
    console.log("Searching this folder for images", imageFolderPath);
    fs.readdir(imageFolderPath, (err, files) => {
        if (err) {
            console.error('Error reading image folder:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        const imageList = files.filter(file => imageExtensions.includes(path.extname(file).toLowerCase()));
        res.json(imageList);
    });
});

// Start server
var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Server is running at http://%s:%s', host, port);
});