const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const schema = mongoose.Schema;

const userSchema = new schema({
    firstName:String,
    lastName:String,
    phoneNumber:String,
    country:String,
    dob:Date,
    email:String,
    password:String,
    sourceMediaReference:String,
    feedback:String,
    suggestions:String,
    willRecommend:Boolean,
    avatar:{data:Buffer, contentType:String},
    active:{type:Boolean, default:false}
})

userSchema.pre('save', function (next){
    const user = this;
    if (!user.isModified('password')) {return next()};
    bcrypt.hash(user.password,10).then((hashedPassword) => {
        user.password = hashedPassword;
        next();
    })    
    
}, function (err) {
    next(err)
})

userSchema.pre('updateOne', function (next){
    const user = this;
    console.log(user._update.password);
    const isHashed = user._update.password.length > 59 && user._update.password.includes('$'); 
    console.log(isHashed);
    if(!isHashed){
        console.log('asdasd');
        bcrypt.hash(user._update.password,10).then((hashedPassword) => {
            user._update.password = hashedPassword;
            next();
        })        
    }
    else{
        next();
    }
    
}, function (err) {
    next(err)
})

userSchema.statics.comparePassword = async function(candidatePassword, user){
    try {
        return await bcrypt.compare(candidatePassword, user.password);
        
    } catch (error) {
        return error;
    }    
}

module.exports = userSchema;