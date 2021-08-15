const db = require('../modules/database');

module.exports.notesList = (req, res, next) => {
    db.query('select * from notes limit = 10', (err, result) => {
        err ? next(err) : res.status(200).json({error: true, msg: "listed!", data: result});
    });
}