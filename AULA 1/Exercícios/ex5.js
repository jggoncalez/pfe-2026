// ARRAY COM HORÁRIOS
const horArray = [8, 12, 25, 15, -2, 20];
let contagemValidos = 0;

// LOOP FOR OF, ITERANDO DE CADA VALOR DA ARRAY
for (horario of horArray) {
    // VERIFICA SE O HORÁRIO ESTÁ ENTRE 0 E 23
    if (horario >= 0 && horario < 24){
        console.log(`Compromisso agendado para as ${horario}h`)
        contagemValidos += 1
    } else{
        console.log(`Atenção: o horario ${horario}h eh invalido!`)
    }
}

console.log(`Total de compromissos validos: ${contagemValidos}`)