const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const userModel = require('../db/mongoose/models/user');
const mailHelper = require('../helper/mail/mail');

router.post('/',  async (req, res) => {
    try {
        const user = await userModel.findOne({email:req.body.email});
        
        if(!user){
            return res.status(200).send({error:"no user email registered for this user"});
        }

        if(!user.active){
            return res.status(200).send({error:"user not activate, check your email and activate through the link"});
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
            console.log(token);
            return res.send({payload:{user:newUser,token}});
        }else{
            return res.send({payload:"password not match"});
        }
        
    } catch (error) {
        res.send({error})
    }
})

router.post('/forgot-password/token',  async (req, res) => {
    try {
        const user = await userModel.findOne({email:req.body.email});
        if(!user){
            return res.status(200).send({error:"no user email registered for this user"});
        }
        
        const mailOptions = {
            from:'sdlabmailer@gmail.com',
            to:req.body.email,
            subject:'SD LAB Forgot Password',
            html:'',
            template:'forgot-password'
        };
        
        const token = jwt.sign({userId:user._id}, "Zm9yZ290LXBhc3N3b3Jk");
       
        const mailOk = await mailHelper.send(mailOptions, [req.headers.origin,token]);

        return res.send({payload:"forgot password request success, check your mail", mail:mailOk})

    } catch (error) {
        return res.send({error})
    }
})

router.post('/forgot-password/verify-token',  async (req, res) => {
    try {

        jwt.verify(req.body.token, "Zm9yZ290LXBhc3N3b3Jk", async (err, payload) => {
            console.log(payload);
            try {
                if(!payload) {
                    throw("Not Valid Token!");
                }else{
                    return res.send({payload:"Token Valid"})
                }
                      
            } catch (error) {
                return res.send({error,payload:{}});
                
            }
          })

    } catch (error) {
        return res.send({error})
    }
})

router.post('/forgot-password/change',  async (req, res) => {
    
    try {
        jwt.verify(req.body.token, "Zm9yZ290LXBhc3N3b3Jk", async (err, payload) => {
           
            try {
                if(!payload) {
                    throw("Not Valid Token!");
                }else{
                    const message = await userModel.updateOne({_id:payload.userId, password:req.body.password});
                    if(message.ok === 1){
                        return res.send({payload:'Password Successfuly Changed!',error:{}});
                    }
                    
                }
                      
            } catch (error) {
               return res.send({error,payload:{}});
                
            }
          })
      
      
       

    } catch (error) {
        return res.send({payload:{error}})
    }
})



module.exports = router;