const express = require('express');
const bodyParser = require('body-parser');
const mongooseServer = require('./db/mongoose/server');
const app = express();
const PORT = 4000;

const userRouter = require('./api/user');
const loginRouter = require('./api/login');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/users', userRouter);
app.use('/login', loginRouter);


app.get('/', (req, res) => {
    res.send("Welcome to sdlab api");
})
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
    mongooseServer.connect();
})

