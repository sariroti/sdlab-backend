const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const userModel = require('../db/mongoose/models/user');

router.post('/',  async (req, res) => {
    try {
        const user = await userModel.findOne({email:req.body.email});
        
        if(!user){
            res.status(200).send({error:"no user email registered for this user"});
        }

        const isMatch = await userModel.comparePassword(req.body.password, user);
        if(isMatch){
            const newUser = {
                id: user._id,
                firstName:user.firstName,
                lastName:user.lastName,
                phoneNumber:user.phoneNumber,
                country: user.country,
                dob:user.dob,
                sourceMediaReference:user.sourceMediaReference,
                feedback:user.feedback,
                suggestions:user.suggestions,
                willRecommend:user.willRecommend
            }
            const token = jwt.sign({userId:newUser.id}, "djghhhhuuwiwuewieuwieuriwu")
            res.send({payload:{user:newUser,token}});
        }else{
            res.send({payload:"password not match"});
        }
        
    } catch (error) {
        res.send({error})
    }
})


module.exports = router;