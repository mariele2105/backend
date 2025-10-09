// Importa o pacote readline-sync
import readline from "readline-sync";

// Importa o controlador
import * as controlador from "./controlador.js";

//Função para exibir o menu
function menu() {
  console.log("\n===== MENU =====");
  console.log("1 - Adicionar tarefa");
  console.log("2 - Buscar tarefa");
  console.log("3 - Atualizar tarefa");
  console.log("4 - Remover tarefa");
  console.log("5 - Sair");
  console.log("================");
}

//Função para escolher a opção do menu
async function escolherOpcao(opcao) {
  switch (opcao) {
    case "1":
      //Adicionar tarefa 
      const nomeAdicionar = readline.question("Digite o nome da tarefa: ");
      await controlador.adicionarTarefa(nomeAdicionar);
      console.log("Tarefa adicionada com sucesso!");
      break;

    case "2":
      //Buscar tarefa
      const nomeBuscar = readline.question("Digite o nome da tarefa: ");
      const tarefa = await controlador.buscarTarefa(nomeBuscar);
      if (tarefa) {
        console.log(tarefa);
      } else {
        console.log("Tarefa não encontrada!");
      }
      break;

    case "3":
      //Atualizar tarefa
      const nomeAtualizar = readline.question("Digite o nome da tarefa: ");
      const concluida = readline.question("A tarefa foi concluída? (true/false): ");
      await controlador.atualizarTarefa(nomeAtualizar, concluida === "true");
      console.log("Tarefa atualizada com sucesso!");
      break;

    case "4":
      //Remover tarefa
      const nomeRemover = readline.question("Digite o nome da tarefa: ");
      await controlador.removerTarefa(nomeRemover);
      console.log("Tarefa removida com sucesso!");
      break;

    case "5":
      //Encerrar execução
      console.log("Encerrando o programa...");
      process.exit(0);

    default:
      console.log("Opção inválida! Tente novamente.");
  }
}

//Função principal
async function main() {
  while (true) {
    menu();
    const opcao = readline.question("Escolha uma opção: ");
    await escolherOpcao(opcao);
  }
}

//Chamada da função main
main();
