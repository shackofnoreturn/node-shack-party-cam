const express = require("express");

const app  = express();

// Set up static file serving
app.use(express.static('public'));

app.post("/upload", (req, res) => {
    console.log(`Upload endpoint reached.`);
    console.log(req.body);
    res.send('String received successfully');
});

// Start server
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('listening at http://%s:%s', host, port);
});