const express = require('express');
//var path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
const apidocsRouter = require('./routes/apidocsRouter')

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use('/api-docs', apidocsRouter)

module.exports = app;
