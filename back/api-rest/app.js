var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var pollsRouter = require('./routes/polls');
var gapsRouter = require('./routes/gaps');
var assignationsRouter = require('./routes/assignations');
var cors = require('cors')

var app = express();
app.use(cors());

var mysql = require("mysql");
//Database connection
app.use(function (req, res, next) {
  res.locals.connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'areufree'
  });
  res.locals.connection.connect();
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/polls', pollsRouter);
app.use('/api/v1/gaps', gapsRouter);
app.use('/api/v1/assignations', assignationsRouter);

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
