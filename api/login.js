const express = require('express');
const router = express.Router();

const userModel = require('../db/mongoose/models/user');

router.post('/',  async (req, res) => {
    try {
        const user = await userModel.findOne({email:req.body.email});
        
        if(!user){
            res.status(200).send({error:"no email registered for this user"});
        }

        const isMatch = await userModel.comparePassword(req.body.password, user);
        console.log(isMatch);
        console.log("heheh");

        res.send({payload:""});
    } catch (error) {
        res.send({error})
    }
})


module.exports = router;