const express = require("express");
const users = require("../modules/user");
const orders = require("../modules/order");
const bcrypt = require("bcryptjs");
const loginRouter = express();

loginRouter.use(express.json());
loginRouter.use(express.urlencoded({extended : true}));

loginRouter.post("/register" ,async (req , res , next) => {

    console.log(req.body);
    try {
        const userName = await users.findOne({where: {username: req.body.username}});
    if (userName === null){
        const userEmail = await users.findOne({where: {email: req.body.email}});
        if (userEmail === null){
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(req.body.password, salt, async function (err, hash) {
                    err ? next(err) : req.body.password = hash;
                    const register = await users.create(req.body);
                    if(req.body.order){
                        await orders.create(req.body.order);
                    }
                    register.image = `\\${register.image}`;
                    res.status(201).json(
                        {
                            error: false,
                            message: "Registed!",
                            data: register
                        }
                    );
                });
            });
        } else {
           res.status(406).json(
                {
                    error : true
                    ,message: "email is already used" ,
                    data : userEmail
                }
            );
        }
    } else {
        res.status(406).json({error : true
        ,message: "username is already used" , data : []});
    }
    } catch (error) {
        next(error);
    }
    
});

module.exports = loginRouter;