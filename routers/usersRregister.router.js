const loginRouter = require("express").Router();
const bcrypt = require("bcryptjs");
const db = require('../modules/database');
const helper = require('../helpers/register.helper').register;

loginRouter.post("/register", helper);

module.exports = loginRouter;
