const htmlForm = document.querySelector('form')
const htmlName = document.querySelector('#name')
const htmlRole = document.querySelector('#role')
const card = document.querySelector('#card')

function updateCard(name, role, color){
    htmlName.innerHTML = name;
    htmlRole.innerHTML = role;
    card.classList.remove('black', 'white', 'blue', 'red', 'green')

    switch (color) {
        case 'black':
            card.classList.add('black')
            break;
        case 'white':
            card.classList.add('white')
            break;
        case 'blue':
            card.classList.add('blue')
            break;
        case 'red':
            card.classList.add('red')
            break;
        case 'green':
            card.classList.add('green')
            break;
    
        default:
            break;
    }
}

function getData(){
    const formData = new FormData(htmlForm)
    const name = formData.get('userName')
    const role = formData.get('userRole')
    const color = formData.get('colors')

    updateCard(name, role, color)
}

