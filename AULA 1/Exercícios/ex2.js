// RODE NPM INSTALL PARA FUNCIONAR!!

// CHAMA O MÓDULO 'READLINE-SYNC'
const rl = require('readline-sync')

// ENTRADA DE DADOS
const salario = rl.questionFloat('Salario: ');
const aluguel = rl.questionFloat('Aluguel: ');
const alimentacao = rl.questionFloat('Alimentacao: ');
const lazer = rl.questionFloat('Salario: ');

// CALCULO DE SALDO
const total = salario - (aluguel + alimentacao + lazer);

// SAÍDA DE DADOS
if (total > 0){ console.log("Saldo positivo") } 
else if (total == 0){ console.log("No Limite") }
else{ console.log("Saldo negativo") }