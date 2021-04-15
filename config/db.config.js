const mysql = require('mysql');

// Create MySQL connection
const dbConnection = mysql.createConnection({

  host: 'darkside.ee',     // database host
  port: 3306,   // default MySQL port
  user: 'rmltvlvis-app-dbuser',     // your database username
  password: 'Kaskollasedtulukesedp6levad?', // your database password
  database: 'rmltvlvis_app_db_test'  // your database name

});


// MySQL connection
dbConnection.connect(function(err) {
  if (err) throw err;
    console.log('Connection to database successfully made.');
})


module.exports = dbConnection;