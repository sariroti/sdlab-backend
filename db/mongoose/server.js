const mongoose = require('mongoose');

const mongodburi = 'mongodb://127.0.0.1/sdlab';

mongoose.connect(mongodburi, { useNewUrlParser: true }, err => {
    if(err) console.log(err);

    console.log(`connected to mongoose db, uri : ${mongodburi}`);
});

module.exports = mongoose.connection;