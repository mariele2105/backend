const express = require('express');
const app = express();

app.use(express.json());

// Rotas
const indexRouter = require('./routes/index');
const tarefaRouter = require('./routes/tarefaRouter');

app.use('/', indexRouter);
app.use('/tarefas', tarefaRouter);
app.use('/produtos', tarefaRouter); 

module.exports = app;

