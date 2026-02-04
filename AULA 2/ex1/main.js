form = document.getElementById('mainForm')
resultLabel = document.querySelector('[result]')
body = document.querySelector('body')

function celsius_Fahrenit(temp){
    convTemperatura = (temp*1.8) + 32;
    resultLabel.innerHTML = `${convTemperatura}`

    return convTemperatura
}


form.addEventListener('submit', (event) => {

    event.preventDefault()
    
    const formData = new FormData(form)
    const result = parseFloat(formData.get('temperatura'))
    console.log(result)
    celsius_Fahrenit(result)
    body.classList.remove('cold-temperature', 'hot-temperature')

    if (result >= 27){
        body.classList.add('hot-temperature')
    } else {
        body.classList.add('cold-temperature')
    }
})
