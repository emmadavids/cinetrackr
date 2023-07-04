const express = require('express');
const app = express();

// Your routes and middleware will go here
app.get('/', (req, res) => {
    res.send('Hello, World!');
    });

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});