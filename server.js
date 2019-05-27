const express = require('express');
const bodyParser = require('body-parser');
const mongooseServer = require('./db/mongoose/server');
const app = express();
const PORT = 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("Welcome to sdlab api");
})
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
    mongooseServer.connect();
})

