// Imports and requires
const express = require('express');
const path = require('path');
var expressLayouts = require('express-ejs-layouts');
var dbConfig = require('./config/db.config.js');

const HOSTNAME = 'ubuntusrv';
const PORT = 3000;
const app = express();

// Set view engine to ejs
app.set('view engine', 'ejs');
app.use(expressLayouts);

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Listen on Port 
app.listen(PORT, HOSTNAME, () => {
  console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});