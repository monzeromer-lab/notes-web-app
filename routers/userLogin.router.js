const express = require("express");
const users = require("../modules/user");
const orders = require("../modules/order");
const bcrypt = require("bcryptjs");
const secret = require('../config/keys.json').TokenSecret;
const JWT = require("jsonwebtoken");
const loginRouter = express();

loginRouter.use(express.json());
loginRouter.use(express.urlencoded({extended : true}));

loginRouter.post("/login" , async (req , res , next) => {

    
 
    const userName = await users.findOne({ where: {email: req.body.email}});
    
    if (userName === null){
        res.status(404).json({error : true , message : "no user" , data : userName});
    
    } else {
       bcrypt.compare( req.body.password, userName.password , async function(err, state) {
        
        let data = await users.findOne({
            attributes: [
            "username",
            "email",
            "firstName",
            "lastName",
            "birthDate",
            "id"
            ],
            where: {
                email: req.body.email
            },include: orders });
            const doit = await orders.create({name: req.body.order , userRef: data.id });
            if(err) {

                 next(err);

            } else if (state) {
                let token = JWT.sign(
                    {
                        id : userName.id,
                        role : userName.role
                    },
                    secret,
                    {expiresIn : "30d"}
                );
                res.status(202).json({error : false , message : "logged in" , data : {profile : data , token : token}});
            
            } else {
                res.status(401).json({error : true , message : "password is wrong! Try Again" , data : []});
            
            }
        }); 
    }
    
});

module.exports = loginRouter;