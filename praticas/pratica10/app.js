require('dotenv').config();
const mongoose = require('mongoose');

const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const apidocsRouter = require('./routes/apidocsRouter')
const usuariosRouter = require('./routes/usuariosRouter');

const app = express();

//CONEXÃO COM MONGODB ATLAS
const mongoURI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE}`;

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB conectado com sucesso!'))
  .catch(err => console.error('Erro ao conectar no MongoDB:', err));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api-docs', apidocsRouter)
app.use('/usuarios', usuariosRouter);


module.exports = app;
