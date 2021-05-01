var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mysql = require('mysql2');


var indexRouter = require('./routes/index');
var scheduleRouter = require('./routes/schedule');
var competitionsRouter = require('./routes/competitions');
var addcompetitionsRouter = require('./routes/addcompetitions');
var reitingRouter = require('./routes/reiting');
var contactRouter = require('./routes/contact');
var usersRouter = require('./routes/users');
const databaseOptions = require('./config/db.config');
const addCompetitionRouter = require('./routes/addcompetitions');


// Create connection to db
var dbConnection = mysql.createConnection(databaseOptions);

// Connect to db
dbConnection.connect(function (err) {
  if (err) throw err;
  console.log('Connection to database successfully made.');
})

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/schedule', scheduleRouter);
app.use('/competitions', competitionsRouter);
app.use('/competitions/add', addcompetitionsRouter);
app.use('/reiting', reitingRouter);
app.use('/contact', contactRouter);
app.use('/users', usersRouter);
app.post('/add', addCompetitionRouter);


/* GET EDIT on COMPETITIONS home page with ID. */
app.get('/competitions/edit/:id', function (req, res) {

  let competitionID = req.params.id;
  let query = "SELECT * FROM `competitions` WHERE id = '" + competitionID + "' ";

  dbConnection.query(query, (err, results) => {

    if (err) {
      return res.status(500).send(err);
    }

    res.render('editcompetitions', {
      competitions: results[0]
    });

  });
});

/* POST CHANGES on COMPETITIONS home page with ID. */
app.post('/competitions/edit/:id', function (req, res) {

  let competitionidForm = req.params.id;

  // values to be inserted
  let values = [req.body.competitionsdateForm, req.body.competitionstimeForm, req.body.competitionsnameForm, req.body.locationForm, req.body.organizerForm, req.body.organisercontactForm, req.body.refereeForm, req.body.refereecontactForm, req.body.participationfeeForm];

  // prepeared MySQL query
  let sql = "UPDATE competitions SET competitionsdate = '" + values[0] + "', competitionstime = '" + values[1] + "', competitionsname = '" + values[2] + "', location = '" + values[3] + "', organizer = '" + values[4] + "', organisercontact = '" + values[5] + "', referee = '" + values[6] + "', refereecontact = '" + values[7] + "', participationfee = '" + values[8] + "' WHERE id = '" + competitionidForm + "'";


  dbConnection.query(sql, (err, results) => {

    // dbConnection.end();
    if (err) throw err;
    res.redirect('/competitions');

  });
});

/* GET Competitions REGISTRATION home page with ID. */
app.get('/competitions/:id/registration', function (req, res) {

  let competitionID = req.params.id;
  let query = "SELECT * FROM `competitions` WHERE id = '" + competitionID + "'; SELECT * FROM reiting ORDER BY RATEORDER = 0 ASC, RATEORDER LIMIT 50;";
  // let query2 = "SELECT * FROM reiting ORDER BY RATEORDER = 0 ASC, RATEORDER LIMIT 1000;";

  dbConnection.query(query, (err, results) => {
    // console.log(results[0]);
    // console.log(results[1]);
    
    if (err) {
      return res.status(500).send(err);
    }

    res.render('registrationcompetition', {
      competitionsinfo: results[0],
      competitionsreiting: results[1]
      // competitionsregistration: results[0]
    });

  });
});

/* GET Competitions INFO home page with ID. */
app.get('/competitions/:id/info', function (req, res) {

  let competitionID = req.params.id;
  let query = "SELECT * FROM `competitions` WHERE id = '" + competitionID + "' ";

  dbConnection.query(query, (err, results) => {

    if (err) {
      return res.status(500).send(err);
    }

    res.render('infocompetition', {
      competitionsinfo: results[0]
    });

  });
});

/* GET Competitions PLACEMENT home page with ID. */
app.get('/competitions/:id/placement', function (req, res) {
  console.log('Req.params.ID: ' + req.params.id)
  let competitionID = req.params.id;
  let query = "SELECT * FROM `competitions` WHERE id = '" + competitionID + "' ";

  dbConnection.query(query, (err, results) => {
    console.log('Results here:' + results);
    if (err) {
      return res.status(500).send(err);
    }

    res.render('placementcompetition', {
      competitionsinfo: results[0]
      //title: 'games'
    });

  });
});

/* GET Competitions COMPETITIONTABLE home page with ID. */
app.get('/competitions/:id/competitiontable', function (req, res) {
  console.log('Req.params.ID: ' + req.params.id)
  let competitionID = req.params.id;
  let query = "SELECT * FROM `competitions` WHERE id = '" + competitionID + "' ";

  dbConnection.query(query, (err, results) => {
    console.log('Results here:' + results);
    if (err) {
      return res.status(500).send(err);
    }

    res.render('competitiontablecompetition', {
      competitionsinfo: results[0]
      //title: 'games'
    });

  });
});


app.get('/competitions/:id/competitiontablex', function (req, res) {
  let competitionID = req.params.id;
  let query = "SELECT * FROM `competitions` WHERE id = '" + competitionID + "' ";

  dbConnection.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }

    res.render('competitiontablecompetitionx', {
      competitionsinfo: results[0],
      competitiongames: JSON.stringify(results)
    });

  });
});


/* GET Competitions GAMES home page with ID. */
app.get('/competitions/:id/games', function (req, res) {
  console.log('Req.params.ID: ' + req.params.id)
  let competitionID = req.params.id;
  let query = "SELECT * FROM `competitions` WHERE id = '" + competitionID + "' ";

  dbConnection.query(query, (err, results) => {
    console.log('Results here:' + results);
    if (err) {
      return res.status(500).send(err);
    }

    res.render('gamescompetition', {
      competitionsinfo: results[0]
      //title: 'games'
    });

  });
});

/* GET Competitions RESULTS home page with ID. */
app.get('/competitions/:id/results', function (req, res) {
  console.log('Req.params.ID: ' + req.params.id)
  let competitionID = req.params.id;
  let query = "SELECT * FROM `competitions` WHERE id = '" + competitionID + "' ";

  dbConnection.query(query, (err, results) => {
    console.log('Results here:' + results);
    if (err) {
      return res.status(500).send(err);
    }

    res.render('resultscompetition', {
      competitionsinfo: results[0]
      //title: 'games'
    });

  });
});

/* GET Competitions AWARDS home page with ID. */
app.get('/competitions/:id/awards', function (req, res) {
  console.log('Req.params.ID: ' + req.params.id)
  let competitionID = req.params.id;
  let query = "SELECT * FROM `competitions` WHERE id = '" + competitionID + "' ";

  dbConnection.query(query, (err, results) => {
    console.log('Results here:' + results);
    if (err) {
      return res.status(500).send(err);
    }

    res.render('awardscompetition', {
      competitionsinfo: results[0]
      //title: 'games'
    });

  });
});


// Custom route for handling all invalid routes
// app.get('*', function (req, res) {
//   res.sendFile(__dirname + '/public/error_pages/404.html');
// });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
