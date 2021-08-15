const express = require("express");
const loginRouter = express();
const helper = require('../helpers/login.helper').login;

loginRouter.post("/login", helper);

module.exports = loginRouter;
