const express = require("express");
const bcrypt = require("bcryptjs");
const loginRouter = express();
const db = require('../modules/database');

loginRouter.use(express.json());
loginRouter.use(express.urlencoded({
    extended: true
}));

loginRouter.post("/register", async (req, res, next) => {

    db.query(`select username from users where username = ${db.escape(req.body.username)}`, (err, result) => {
        if (err) {
            next(err)
        } else if (result.length >= 1) {
            res.status(403).json({
                error: true,
                msg: 'username is already taken!',
                data: {}
            });
        } else {
            db.query(`select email from users where email = ${db.escape(req.body.email)}`, (err, result) => {
                err ? next(err) : result.length >= 1 ? res.status(403).json({
                    error: true,
                    msg: 'email is already taken!',
                    data: {}
                }) : bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(req.body.password, salt, async function (err, hash) {
                        err ? next(err) :
                            db.query(`insert into users (username, firstName, lastName, email, password, birthDate ) values (${db.escape(req.body.username)}, ${db.escape(req.body.firstName)}, ${db.escape(req.body.lastName)}, ${db.escape(req.body.email)}, ${db.escape(hash)}, ${db.escape(req.body.birthDate)})`, (err, result) => {
                                err ? next(err) : res.status(201).json({
                                    error: false,
                                    msg: 'registerd successfully!',
                                    data: {}
                                });

                            });
                    });
                });
            });
        }
    });
});

module.exports = loginRouter;