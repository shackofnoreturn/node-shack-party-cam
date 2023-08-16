const express    = require("express");
const bodyParser = require('body-parser');
const fs = require('fs');

// Defining constants
const app  = express();
const port = 3000;

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

// Start server
var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Server is running at http://%s:%s', host, port);
});