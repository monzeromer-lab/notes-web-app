const express = require("express");
const bcrypt = require("bcryptjs");
const secret = require('../config/keys.json').TokenSecret;
const JWT = require("jsonwebtoken");
const loginRouter = express();
const db = require('../modules/database');

loginRouter.post("/login", (req, res, next) => {

    function autherizeUser(data) {
        let token = JWT.sign({
                id: data.id
            },
            secret, {
                expiresIn: "30d"
            }
        );
        res.status(200).json({
            error: false,
            msg: 'loggedin succussfuly!',
            data: {
                profile: data,
                bearerToken: token
            }
        });
    }

    db.query(`select * from users where email = ${db.escape(req.body.email)};`, (err, result) => {

        err ? next(err) : result.length >= 1 ?
            bcrypt.compare(req.body.password, result[0].password, async function (err, state) {
                err ? next(err) : state === true ? autherizeUser(result[0]) :
                    res.status(403).json({
                        error: true,
                        msg: 'password is wrong!',
                        data: {}
                    });


                //bcrypt end    
            }) :
            res.status(403).json({
                error: true,
                msg: 'register first or check your email',
                data: {}
            });

        //db end    
    });
    //endpoint end        
});

module.exports = loginRouter;