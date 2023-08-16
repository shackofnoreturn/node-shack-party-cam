const express    = require("express");
const bodyParser = require('body-parser');

// Defining constants
const app  = express();
const port = 3000;

// Application configuration
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.static('public'));

// Upload endpoint
app.post("/upload", (req, res) => {
    const img = req.body.file;
    var regex = /^data:.+\/(.+);base64,(.*)$/;

    var matches = string.match(regex);
    var ext = matches[1];
    var data = matches[2];
    var buffer = Buffer.from(data, 'base64'); //file buffer
      
     fs.writeFileSync('imagename.jpg' + ext, buffer); //if you do not need to save to file, you can skip this step.
     
     // return response to client
     res.send('String received successfully');
});

// Start server
var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('listening at http://%s:%s', host, port);
});