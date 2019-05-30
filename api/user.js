const express = require('express');
const router = express.Router();
const userModel = require('../db/mongoose/models/user');
const mailHelper = require('../helper/mail/mail');

router.get('/', async(req, res) => {
    try {
        const message = await userModel.findById(req.tokenPayload.userId);
     
        const newUser = {
            id: message._id,
            firstName:message.firstName,
            lastName:message.lastName,
            email:message.email,
            phoneNumber:message.phoneNumber,
            country: message.country,
            dob:message.dob,
            sourceMediaReference:message.sourceMediaReference,
            feedback:message.feedback,
            suggestions:message.suggestions,
            willRecommend:message.willRecommend,
            avatar:{
                data : message.avatar.data.toString('utf8'),
                type: message.avatar.type
            }
        }
        console.log(newUser);
        return res.send({payload:newUser});     
    } catch (error) {
        return res.send({error});
    }
   
})

router.post('/',  async (req, res) => {
    try {
       
        const message = await userModel.create(req.body);
        const mailOptions = {
            from:'sdlabmailer@gmail.com',
            to:req.body.email,
            subject:'SD LAB Registration',
            html:'',
            template:'registration'
        };
        
        const userIdbase64 = Buffer.from(message._id.toHexString()).toString('base64');
        const mailOk = await mailHelper.send(mailOptions, userIdbase64);
        
        return res.send({payload:message, mail:mailOk});
    } catch (error) {
        return res.send({error})
    }
})

router.put('/', async(req, res) => {
    try {
        const message = await userModel.updateOne(req.body);
        return res.send({payload:message});
    } catch (error) {
        return res.send({error});
    }
})

router.get('/activate', async(req, res) => {
    try {
        const userId = Buffer.from(req.query.userid, 'base64').toString();
        const user = await userModel.findById(userId);
       console.log(user);
        if(user){
            console.log('hehe');
            const message = await userModel.updateOne({_id:user._id},{password: user.password, active:true});
            console.log(message);
            return res.status(301).redirect('http://localhost:3000/login');
        }
        else{
            return res.status(200).send({payload:"user not found"})
        }
    } catch (error) {
        return res.send({error});
    }
})



module.exports = router;