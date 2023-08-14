const express = require("express");

const app  = express();
const port = 3000;

// Set up static file serving
app.use(express.static('public'));

app.post("/upload", (req, res) => {
    console.log(`Upload endpoint reached.`);
    console.log(req.body);
    res.send('String received successfully');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});