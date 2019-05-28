const express = require('express');
const jwt = require('jsonwebtoken');
const userModel = require('../../db/mongoose/models/user');
const router = express.Router();

const routesByPassList = [
    {
        url:'/users',
        method:'POST'
    }
]
// a middleware function with no mount path. This code is executed for every request to the router
router.use(async (req, res, next) => {
    const routeExist = routesByPassList.some(el => el.method == req.method && el.url == req.originalUrl);
    if(routeExist){
        next();
    }
    else{
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, "djghhhhuuwiwuewieuwieuriwu", async (err, payload) => {
            try {
                if(!payload) {
                    throw("Not Valid Token!");
                }else{
                    req.tokenPayload = payload;
                    next(); 
                }
                      
            } catch (error) {
                res.send({error,payload:{}});
                
            }
          })
    }
   
})


module.exports = router;