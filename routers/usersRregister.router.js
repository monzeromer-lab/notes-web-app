const loginRouter = require("express").Router();
const helper = require('../helpers/register.helper').register;

loginRouter.post("/register", helper);

module.exports = loginRouter;
