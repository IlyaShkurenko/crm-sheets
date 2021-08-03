const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const formidable = require('express-formidable');
const bodyParser = require('body-parser');
const cors = require('cors');
const users = require('./routes/users');

const app = express();

// view engine setup
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.use(formidable())
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Running on port: ${port}`);
});

// const port = process.env.PORT ||  3000;
// const host = process.env.HOST || '0.0.0.0'; // 'localhost';
// if ([80, 442].includes(parseInt(port))) {
//   app.set('trust proxy', 1);
// }
// app.listen(port, host, () => {
//   console.log(`Running on http://${host}:${port}`);
// });

module.exports = app;
