var express = require('express');
var router = express.Router();
const mysql = require('mysql2');
const databaseOptions = require('../config/db.config');

// Create connection to db
var dbConnection = mysql.createConnection(databaseOptions);

/* GET home page. */
router.get('/', function(req, res, next) {

  // res.render('competitions', { title: 'competitions' });

  let sql = "SELECT * FROM competitions";
  let query = dbConnection.query(sql, (err, results) => {

    if (err) throw err;
    res.render('competitions', { results : results });

  });
});

module.exports = router;
