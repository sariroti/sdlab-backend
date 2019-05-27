const mongoose = require('mongoose');

const schema = mongoose.Schema;

const userSchema = new schema({
    firstName:String,
    lastName:String,
    phoneNumber:String,
    country:String,
    dob:Date,
    password:String,
    sourceMediaReference:String,
    feedback:String,
    suggestions:String,
    willRecommend:Boolean
})

module.exports = userSchema;