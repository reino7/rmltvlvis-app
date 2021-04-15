// Imports and requires
const express = require('express');
const path = require('path');
//var dbConfig = require('./config/db.config.js');

const HOSTNAME = 'localhost';
const PORT = 3000;
const app = express();

// Static Files ...
app.use(express.static('public'))

// Set view engine to ejs
app.set('view engine', 'ejs');

// index page
app.get('/', function(req, res) {
  res.render('pages/index');
});



// Listen on Port 
app.listen(PORT, HOSTNAME, () => {
  console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});