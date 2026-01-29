// RODE NPM INSTALL PARA FUNCIONAR!!

// CHAMA O MÓDULO READLINE-SYNC
const rl = require('readline-sync');

// ENTRADA DE DADOS DO USUÁRIO
const hora = rl.questionInt(`Digite a hora:`);
const prioridade = rl.questionInt(`Digite a prioridade:`);

// SAÍDA DE DADOS
if (hora >= 0 && hora < 24) {
    if (prioridade > 0 && prioridade <= 10) {
        if (hora <= 17) {
            if (prioridade > 8) { console.log('TAREFA CRÍTICA/URGENTE') }
            else if (prioridade == 7 || prioridade == 8) { console.log('TAREFA IMPORTANTE') }
            else { 'TAREFA NÃO IMPORTANTE' }
        } else {
            console.log('TAREFA NÃO IMPORTANTE')
        }
    } else {
        console.log("Nível de Prioridade Inválida")
    }
} else {
    console.log("Horário inválido")
}
