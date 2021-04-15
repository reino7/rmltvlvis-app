const mysql = require('mysql');

// Create MySQL connection
const dbConnection = mysql.createConnection({

  host: '',     // database host
  port: 3306,   // default MySQL port
  user: '',     // your database username
  password: '', // your database password
  database: ''  // your database name

});


// MySQL connection
dbConnection.connect(function(err) {
  if (err) throw err;
    console.log('Connection to database successfully made.');
})


module.exports = dbConnection;