var express = require('express');
var router = express.Router();
const mysql = require('mysql2');
var path = require('path');

const databaseOptions = require('../config/db.config');

// Create connection to db
var dbConnection = mysql.createConnection(databaseOptions);


module.exports = router;
