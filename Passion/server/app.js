var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//Graps the routes to use for the server side
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let gamesRouter = require("./routes/games");
let reviewsRouter = require("./routes/reviews");

var app = express();

//MongoDB setup
var mongoose = require('mongoose');
var mongoDB = 'mongodb+srv://admin:test4321@thepit-anhst.azure.mongodb.net/MongoTest?retryWrites=true';
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// express setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const expressSession = require('express-session');
//how to salt and hash for the application
app.use(expressSession({
  secret: "codecrew",
  name: "cookie_name",
  // store: "sessionStore", // connect-mongo session store
  proxy: true,
  resave: true,
  saveUninitialized: true
}));
//which route access' the specific routes for the appplication
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/games",gamesRouter);
app.use("/reviews",reviewsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
