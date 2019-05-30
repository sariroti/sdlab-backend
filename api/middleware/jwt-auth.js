const express = require('express');
const jwt = require('jsonwebtoken');
const userModel = require('../../db/mongoose/models/user');
const router = express.Router();

const routesByPassList = [
    {
        url:'/users',
        method:'POST'
    },
    {
        url:'/users/activate',
        method:'GET'
    },
    {
        url:'/authentication/forgot-password',
        method:'GET'
    },
    {
        url:'/authentication/forgot-password',
        method:'POST'
    },
    {
        url:'/authentication',
        method:'GET'
    }
]
// a middleware function with no mount path. This code is executed for every request to the router
router.use((req, res, next) => {
    const url = req.originalUrl.indexOf("?") > 0 ? req.originalUrl.split("?")[0] : req.originalUrl;
    const routeExist = routesByPassList.some(el => el.method == req.method && el.url == url);
    if(routeExist){
        next();
    }
    else{
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        jwt.verify(token, "djghhhhuuwiwuewieuwieuriwu", async (err, payload) => {
            console.log(payload);
            try {
                if(!payload) {
                    throw("Not Valid Token!");
                }else{
                    req.tokenPayload = payload;
                    next(); 
                }
                      
            } catch (error) {
                return res.send({error,payload:{}});
                
            }
          })
    }
   
})


module.exports = router;