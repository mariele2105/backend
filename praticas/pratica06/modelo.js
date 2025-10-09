// Importa a função conectarDb do arquivo database.js
import { conectarDb } from "./database.js";

class Tarefa {
  //Propriedades assíncronas de conexão e coleção
  static async inicializar() {
    const db = await conectarDb();
    this.collection = db.collection("tarefas");
  }

  //Construtor com as propriedades solicitadas
  constructor(nome, concluida) {
    this.id = null;
    this.nome = nome;
    this.concluida = concluida;
  }

  //Função assíncrona inserir
  async inserir() {
    const resultado = await Tarefa.collection.insertOne({
      nome: this.nome,
      concluida: this.concluida,
    });
    this.id = resultado.insertedId;
  }

  //Função assíncrona alterar
  async alterar() {
    await Tarefa.collection.updateOne(
      { _id: this.id },
      { $set: { nome: this.nome, concluida: this.concluida } }
    );
  }

  //Função assíncrona deletar
  async deletar() {
    await Tarefa.collection.deleteOne({ nome: this.nome });
  }

  //Função assíncrona buscar
  async buscar() {
    const resultado = await Tarefa.collection.findOne({ nome: this.nome });
    if (resultado) {
      this.id = resultado._id;
      this.nome = resultado.nome;
      this.concluida = resultado.concluida;
    }
  }
}

// Inicializa a conexão com o banco e define a coleção
await Tarefa.inicializar();

//Exporta a classe Tarefa
export { Tarefa };
