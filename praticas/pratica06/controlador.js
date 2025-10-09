//Importa a classe Tarefa do arquivo modelo.js
import { Tarefa } from "./modelo.js";

//Função para adicionar tarefa
async function adicionarTarefa(nome) {
  //Cria instância de Tarefa com o nome recebido
  const tarefa = new Tarefa(nome, false);
  //Chama o método inserir
  await tarefa.inserir();
}

//Função para buscar tarefa
async function buscarTarefa(nome) {
  //Cria instância de Tarefa com o nome recebido
  const tarefa = new Tarefa(nome, false);
  //Retorna o resultado da função buscar
  return await tarefa.buscar();
}

//Função para atualizar tarefa
async function atualizarTarefa(nome, concluida) {
  //Cria instância de Tarefa com o nome recebido
  const tarefa = new Tarefa(nome, concluida);

  //Busca a tarefa antes de alterar
  await tarefa.buscar();
  if (tarefa.id) {
    tarefa.nome = nome;
    tarefa.concluida = concluida;
    //Chama o método alterar
    await tarefa.alterar();
  }
}

//Função para remover tarefa
async function removerTarefa(nome) {
  // n) Cria instância de Tarefa com o nome recebido
  const tarefa = new Tarefa(nome, false);

  //Busca a tarefa antes de deletar
  await tarefa.buscar();
  if (tarefa.id) {
    await tarefa.deletar();
  }
}

//Exporta todas as funções
export { adicionarTarefa, buscarTarefa, atualizarTarefa, removerTarefa };
