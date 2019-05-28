const express = require('express');
const router = express.Router();
const userModel = require('../db/mongoose/models/user');
const mailHelper = require('../helper/mail/mail');

router.get('/', async(req, res) => {
    try {
        const message = await userModel.findById(req.tokenPayload.userId);
        res.send({payload:message});     
    } catch (error) {
        res.send({error});
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
        console.log(userIdbase64);
        const mailOk = await mailHelper.send(mailOptions, userIdbase64);
        
        res.send({payload:message, mail:mailOk});
    } catch (error) {
        res.send({error})
    }
})

router.put('/', async(req, res) => {
    try {
        const message = await userModel.updateOne(req.body);
        res.send({payload:message});
    } catch (error) {
        res.send({error});
    }
})

router.get('/activate', async(req, res) => {
    try {
        console.log("asdsada");
        const userId = Buffer.from(req.query.userid, 'base64').toString();
        const user = await userModel.findById(userId);
        const message = await userModel.updateOne({_id:user._id, password: user.password, active:true});
        res.send({payload:message});
    } catch (error) {
        res.send({error});
    }
})



module.exports = router;