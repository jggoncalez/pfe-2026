// RODE NPM INSTALL PARA FUNCIONAR!!

// CHAMA O MÓDULO 'READLINE-SYNC'
const rl = require('readline-sync')

function main(){
    // ENTRADA DE DADOS
    const nome = rl.question('Nome: ');

    // SAÍDA DE DADOS
    console.log(`${limparNomeContato(nome)}\nQtt de letras ${quantasLetras(nome)}`);
}

// FUNÇÃO QUE LIMPA O NOME DO CONTATO (DEIXA MAIÚSCULO E SEM ESPAÇOS ANTES E DEPOIS)
function limparNomeContato(nome){
    return nome.toUpperCase().trim()
}

// FUNÇÃO QUE CONTA QUANTAS LETRAS TEM O NOME
function quantasLetras(nome) {
    nomeArr = nome.split("")
    return nomeArr.length;
}

//CHAMA FUNÇÃO MAIN
main()