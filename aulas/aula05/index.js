// importa o framework 
const express = require("express");

//importa middleware de terceiros
const cors = require('cors');

// importa middleware de rota
const router = require('./routerTarefa');

// criar uma instancia da aplicação
const app = express();

//middleware embutido ou integrado
app.use(express.json());
app.use(express.urlencoded({ extended: false})); 

//middleware de terceiros
app.use(cors());

//middleware de aplicaçao
app.use(function(req, res, next) {
  console.log("Passei aqui");
  next();
})

//middleware de rota 
app.use('/tarefas', router);

//middleware de erro
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send("Algo de errado nao esta certo")
})

//inicia a aplicaçao
app.listen(3000, ()=>{
    console.log("APP está ON!");
});