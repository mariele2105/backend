const readline = require('readline-sync');
const Contato = require('./modelo');

function listar(){
    contatos.forEach(contato => console.log(contato.nome,  '-', contato.telefone));
    readline.question('\nPressione enter para continuar...\n');
}

function buscar(){
    const nome = readline.question("Informe o nome do contato: ");
    const buscaContato = contatos.find(contato => contato.nome === nome );
    if  (buscaContato){
        console.log(buscaContato.nome, '-', buscaContato.telefone);
    } else {
        console.log('Contato não encontrado!')  
    }
    readline.question('\nPressione enter para continuar...\n');
}

function criar(){
    const nome = readline.question( 'Nome: ' );
    const telefone = readline.question('Telefone: ');
    const novo = new Contato(nome, telefone);
    contatos.push(novo);
    readline.question('\nPressione enter para continuar...\n');
}

function atualizar(){
    const nome = readline.question("Informe o nome do contato: ");
    const buscaContato = contatos.find(contato => contato.nome === nome );
    if  (buscaContato){
        const telefone = readline.question("Informe o novo telefone do contato: ");
        buscaContato.telefone = telefone;
    } else {
        console.log('Contato não encontrado!')  
    }
    
    readline.question('\nPressione enter para continuar...\n');
}

function remover(){
    const nome = readline.question("Informe o nome do contato a ser removido: ");
    const posicao = contatos.findIndex(contato => contato.nome == nome);
    if (posicao >= 0) {
        contatos.splice(posicao, 1);
    } else{
        console.log('Contato não encontrado!')    
    }
    readline.question('\nPressione enter para continuar...\n');
}

module.exports = {listar, criar, buscar, atualizar, remover}