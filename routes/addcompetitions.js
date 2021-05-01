var express = require('express');
var router = express.Router();
const mysql = require('mysql2');
var path = require('path');

const databaseOptions = require('../config/db.config');

// Create connection to db
var dbConnection = mysql.createConnection(databaseOptions);

/* GET addcompetition home page. */
router.get('/', function (req, res, next) {

  // res.render('competitions', { title: 'competitions' });

  let sql = "SELECT * FROM competitions";
  let query = dbConnection.query(sql, (err, results) => {

    if (err) throw err;
    res.render('addcompetitions', { results: results });

  });

});

/* POST addcompetition home page. */
router.post('/', function (req, res) {

  let competitionID = req.params.id;
  let competitionsdateForm = req.body.competitionsdateForm;
  let competitionstimeForm = req.body.competitionstimeForm;
  let competitionsnameForm = req.body.competitionsnameForm;
  let locationForm = req.body.locationForm;
  let organizerForm = req.body.organizerForm;
  let organisercontactForm = req.body.organisercontactForm;
  let refereeForm = req.body.refereeForm;
  let refereecontactForm = req.body.refereecontactForm;
  let participationfeeForm = req.body.participationfeeForm;

  // prepeared MySQL query
  let sql = "INSERT INTO competitions (competitionsdate, competitionstime, competitionsname, location, organizer, organisercontact, referee, refereecontact, participationfee) VALUES ?";
  
  // values to be inserted
  let values = [[competitionsdateForm, competitionstimeForm, competitionsnameForm, locationForm, organizerForm, organisercontactForm, refereeForm, refereecontactForm, participationfeeForm]];

  dbConnection.query(sql, [values], (err, results) => {

    // dbConnection.end();
    if (err) throw err;
    res.redirect('/competitions' + competitionID + '/placement');
    
  });

})

module.exports = router;
