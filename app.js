var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mysql = require('mysql2');


var indexRouter = require('./routes/index');
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
app.use('/competitions', competitionsRouter);
app.use('/competitions/add', addcompetitionsRouter);
app.use('/reiting', reitingRouter);
app.use('/contact', contactRouter);
app.use('/users', usersRouter);
app.post('/add', addCompetitionRouter);


/* GET schedule home page with ID. */
app.get('/schedule', function (req, res) {

  // res.render('competitions', { title: 'competitions' });

  let sql = "SELECT * FROM schedule";
  let query = dbConnection.query(sql, (err, results) => {

    if (err) throw err;
    res.render('schedule', { schedule : results });

  });

});

/* GET ADD schedule home page with ID. */
app.get('/schedule/add', function (req, res) {

  let sql = "SELECT * FROM schedule";
  let query = dbConnection.query(sql, (err, results) => {

    if (err) throw err;
    res.render('addschedule', { schedule: results });

  });
});

/* POST ADD schedule home page with ID. */
app.post('/schedule/add', function (req, res) {

  let scheduledateForm = req.body.scheduledateForm;
  let scheduletimeForm = req.body.scheduletimeForm;
  let schedulenameForm = req.body.schedulenameForm;
  let schedulelocationForm = req.body.schedulelocationForm;

  // prepeared MySQL query
  let sql = "INSERT INTO schedule (competitiondate, competitiontime, competitionname, location) VALUES ?";
  
  // values to be inserted
  let values = [[scheduledateForm, scheduletimeForm, schedulenameForm, schedulelocationForm]];

  dbConnection.query(sql, [values], (err, results) => {

    // dbConnection.end();
    if (err) throw err;
    res.redirect('/schedule');
    
  });
});

/* GET EDIT on schedule home page with ID. */
app.get('/schedule/edit/:id', function (req, res) {

  let scheduleID = req.params.id;
  let query = "SELECT * FROM `schedule` WHERE scheduleid = '" + scheduleID + "' ";

  dbConnection.query(query, (err, results) => {

    if (err) {
      return res.status(500).send(err);
    }

    res.render('editschedule', {
      schedule: results[0]
    });

  });
});

/* POST CHANGES on schedule home page with ID. */
app.post('/schedule/edit/:id', function (req, res) {

  let scheduleidForm = req.params.id;

  // values to be inserted
  let values = [req.body.scheduledateForm, req.body.scheduletimeForm, req.body.schedulenameForm, req.body.schedulelocationForm];

  // prepeared MySQL query
  let sql = "UPDATE schedule SET competitiondate = '" + values[0] + "', competitiontime = '" + values[1] + "', competitionname = '" + values[2] + "', location = '" + values[3] + "' WHERE scheduleid = '" + scheduleidForm + "'";


  dbConnection.query(sql, (err, results) => {

    // dbConnection.end();
    if (err) throw err;
    res.redirect('/schedule');

  });
});

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
  let query = 
	"SELECT * FROM `competitions` WHERE id = '" + competitionID + "'; " +          // query1
	"select game.*, "+                                                             // query2
	"concat(player1data.FIRSTNAME,' ',player1data.FAMNAME) as Voistleja1, "+
	"concat(player2data.FIRSTNAME,' ',player2data.FAMNAME) as Voistleja2, "+
	"concat(winnerdata.FIRSTNAME,' ',winnerdata.FAMNAME) as Voitja "+
	"from "+
	"game "+
	"left join reiting as player1data on game.player1=player1data.PERSONID "+
	"left join reiting as player2data on game.player2=player2data.PERSONID "+
	"left join reiting as winnerdata on game.winner=winnerdata.PERSONID "+
	"where competitionid=" + competitionID + ";";

  dbConnection.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }

    res.render('competitiontablecompetitionx', {
      competitionsinfo: results[0],
      competitiongames: JSON.stringify(results[1])
    });

  });
});


/* GET Competitions GAMES home page with ID. */
app.get('/competitions/:id/games', function (req, res) {

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
