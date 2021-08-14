const indexRouter = require("express").Router();

// indexRouter.use("/" , require("./usersRregister.router"));
indexRouter.use("/" , require("./userLogin.router"));

module.exports = indexRouter;