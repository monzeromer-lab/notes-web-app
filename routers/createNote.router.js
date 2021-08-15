const noteRouter = require('express').Router();
const helper = require('../helpers/listNotes.helper');

noteRouter.get('/list', helper);

module.exports = noteRouter;
