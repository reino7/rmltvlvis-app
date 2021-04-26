var express = require('express');
var router = express.Router();
const mysql = require('mysql2');
const databaseOptions = require('../config/db.config');

// Create connection to db
var dbConnection = mysql.createConnection(databaseOptions);


/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('reiting', { title: 'reiting' });
  
  let sql = "SELECT * FROM reiting WHERE RATEORDER BETWEEN 1 AND 600 ORDER BY RATEORDER ASC";
  let query = dbConnection.query(sql, (err, results) => {
    if (err) throw err;

    // for (let i = 0; i < results.length; i++) {
    //   const element = results[i];
    //   console.log(element.PERSONID + ' ' + element.FIRSTNAME + ' ' + element.FAMNAME + ' ' + element.SEX);
    // }

    res.render('reiting', { results : results });
    //res.send('Reiting fetched');
  });

});

module.exports = router;
