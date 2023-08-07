var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//mongo
const mongoose = require('mongoose');
require('./models/catelory');
require('./models/product');
require('./models/Tin_tuc');
require('./models/user');
require('./models/monhoc');
require('./models/lichhoc');
require('./models/lichthi');
require('./models/game');
require('./models/played');
require('./models/tin_tucap');
require('./models/card');



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productRouter = require('./routes/product');
var Tin_tucRouter = require('./routes/Tin_tuc');
var userRouter = require('./routes/user');
var monhocRouter = require('./routes/monhoc');
var lichhocRouter = require('./routes/lichhoc');
var lichthiRouter = require('./routes/lichthi');
var gameRouter = require('./routes/game');
var playedRouter = require('./routes/played');
var tin_tucapRouter = require('./routes/tin_tucap');
var cardRouter = require('./routes/card');





var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//connect database
//mongodb://127.0.0.1:27017/MyFpoly
mongoose.connect('mongodb+srv://luanphung1357:zangun20@cluster0.bdmxvch.mongodb.net/MyFpoly', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('>>>>>>>>>> DB Connected!!!!!!'))
  .catch(err => console.log('>>>>>>>>> DB Error: ', err));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/san-pham', productRouter);
app.use('/tin-tuc', Tin_tucRouter);
app.use('/user', userRouter);
app.use('/monhoc', monhocRouter);
app.use('/lichhoc', lichhocRouter);
app.use('/lichthi', lichthiRouter);
app.use('/game', gameRouter);
app.use('/played', playedRouter);
app.use('/tin-tucap', tin_tucapRouter);
app.use('/card', cardRouter);


// luan
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
