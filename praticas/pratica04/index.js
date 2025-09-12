import express from "express";

const app = express();

const tarefas = [
  { id: 1, nome: "Estudar middleware", concluida: false },
  { id: 2, nome: "Praticar Express", concluida: true }
];

app.use(express.json());

app.use((req, res, next) => {
  const dataHora = new Date().toISOString();
  console.log(`[${dataHora}] ${req.method} ${req.url}`);
  next();
});

const tarefasRouter = express.Router();

// GET /tarefas — listar todas as tarefas
tarefasRouter.get("/", (req, res) => {
  res.json(tarefas);
});

// POST /tarefas — criar nova tarefa
tarefasRouter.post("/", (req, res) => {
  const novaTarefa = {
    id: tarefas.length + 1,
    nome: req.body.nome,
    concluida: req.body.concluida ?? false
  };
  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});

// GET /tarefas/:tarefaId — buscar tarefa pelo id
tarefasRouter.get("/:tarefaId", (req, res, next) => {
  const id = parseInt(req.params.tarefaId);
  const tarefa = tarefas.find(t => t.id === id);
  if (!tarefa) return next(new Error("Tarefa não localizada")); // lança erro
  res.json(tarefa);
});

// PUT /tarefas/:tarefaId — atualizar tarefa
tarefasRouter.put("/:tarefaId", (req, res, next) => {
  const id = parseInt(req.params.tarefaId);
  const tarefa = tarefas.find(t => t.id === id);
  if (!tarefa) return next(new Error("Tarefa não localizada")); // lança erro

  tarefa.nome = req.body.nome ?? tarefa.nome;
  tarefa.concluida = req.body.concluida ?? tarefa.concluida;

  res.json(tarefa);
});

// DELETE /tarefas/:tarefaId — remover tarefa
tarefasRouter.delete("/:tarefaId", (req, res, next) => {
  const id = parseInt(req.params.tarefaId);
  const index = tarefas.findIndex(t => t.id === id);
  if (index === -1) return next(new Error("Tarefa não localizada")); // lança erro

  tarefas.splice(index, 1);
  res.sendStatus(204);
});

// Usar o roteador
app.use("/tarefas", tarefasRouter);

// Middleware de erro
app.use((err, req, res, next) => {
  res.status(400).json({ erro: err.message });
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});

export default express;
