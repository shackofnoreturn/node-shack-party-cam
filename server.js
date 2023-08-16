const express = require("express");

const app  = express();

// Set up static file serving
app.use(express.static('public'));

app.post("/upload", (req, res) => {
    console.log(`Upload endpoint reached.`);
    
    const img = req.body.file;
     var regex = /^data:.+\/(.+);base64,(.*)$/;

     var matches = string.match(regex);
     var ext = matches[1];
     var data = matches[2];
     var buffer = Buffer.from(data, 'base64'); //file buffer
      
     //do whatever you want with the buffer

     fs.writeFileSync('imagename.jpg' + ext, buffer); //if you do not need to save to file, you can skip this step.
     
     // return res to client
     res.send('String received successfully');
});

// Start server
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('listening at http://%s:%s', host, port);
});