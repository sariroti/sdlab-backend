const express = require('express');
const router = express.Router();

const userModel = require('../db/mongoose/models/user');

router.get('/', async(req, res) => {
    try {
        const message = await userModel.findById(req.query.id);
        res.send({payload:message});     
    } catch (error) {
        res.send({error});
    }
   
})

router.post('/',  async (req, res) => {
    try {
        const message = await userModel.create(req.body);
        res.send({payload:message});
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

module.exports = router;