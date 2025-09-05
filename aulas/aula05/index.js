// importa o framework 
const express = require("express");

// criar uma instancia da aplicação
const app = express();

//middleware de aplicaçao
app.use(function(req, res, next) {
  console.log("Passei aqui");
  next();
})

//middlare de rota
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Chegou aqui");
});

router.post('/', (req, res) => {
    res.status(201).send("Inserido com sucesso");
})

router.get("/:id", (req, res) => {
    const { id } = req.params;
    if (id == 1) return res.send("Achei");
    throw Error("Não achei");
})

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

