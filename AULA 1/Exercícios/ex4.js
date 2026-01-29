// RODE NPM INSTALL PARA FUNCIONAR!!

// CHAMA O MÓDULO 'READLINE-SYNC'
const rl = require('readline-sync')

// PEGA A DATA DO DIA DE HOJE
const dataHoje = new Date()

// ENTRADA DE DADOS (DATA DO EVENTO)
const userDateInput = rl.question("Digite a data do evento dessa forma: DD MM AAAA hh mm ss ");

// DIVIDE CADA VALOR PELO ESPAÇO E JOGA EM UMA ARRAY
const dateArr = userDateInput.split(" ")

let evento;
if (dateArr.length == 6){ // VERIFICA SE O INPUT DO USUÁRIO SEGUIU O PADRÃO PEDIDO 

    // ORGANIZA O INPUT DO USUÁRIO PARA O PADRÃO DO CONSTRUTOR DATE()
    evento = new Date(dateArr[2], dateArr[1], dateArr[0], dateArr[3], dateArr[4], dateArr[5])

    //SUBTRAI A DATA DO EVENTO PELA DATA DE HOJE, RECEBENDO O VALOR EM MS
    console.log(evento - dataHoje)
} else {
    console.log("Data incorreta")
}

