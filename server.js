const express = require('express');
const bodyParser = require('body-parser');
const mongooseServer = require('./db/mongoose/server');
const cors = require('cors');
const app = express();
const PORT = 4000;

const userRouter = require('./api/user');
const authenticationRouter = require('./api/authentication');
const jwtAuthRouter = require('./api/middleware/jwt-auth');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });

var corsOptions = {
    origin: true,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true'
};

app.use(cors(corsOptions));

app.use('/users', jwtAuthRouter, userRouter);
app.use('/authentication', authenticationRouter);


app.get('/', (req, res) => {
    res.send("Welcome to sdlab api");
})
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
    mongooseServer.connect();
})

