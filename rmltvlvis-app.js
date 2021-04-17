// Imports and requires
const express = require('express');
const path = require('path');
const mysql = require('mysql');
const databaseOptions = require('./config/db.config.js');

const HOSTNAME = 'localhost';
const PORT = 3000;
const app = express();


// Create connection to db
var dbConnection = mysql.createConnection(databaseOptions);

// Connect to db
dbConnection.connect(function (err) {
  if (err) throw err;
  console.log('Connection to database successfully made.');
})

// Static Files
app.use(express.static('public'))

// Set view engine to ejs
app.set('view engine', 'ejs');

// index page
app.get('/', function (req, res) {
  res.render('pages/index');
});

// reiting page
app.get('/reiting', (req, res) => {
  let sql = 'SELECT * FROM reiting LIMIT 10';
  let query = dbConnection.query(sql, (err, results) => {
    if (err) throw err;
    // console.log(results);

    for (let i = 0; i < results.length; i++) {
      const element = results[i];
      console.log(element.PERSONID + ' ' + element.FIRSTNAME + ' ' + element.FAMNAME + ' ' + element.SEX);
    }

    res.render('pages/reiting');
    //res.send('Reiting fetched');
  });
});

// Listen on Port 
app.listen(PORT, HOSTNAME, () => {
  console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});