function intialiseButtons() {
    const buttons = document.querySelectorAll('button');
    console.log(buttons);
    buttons.forEach((button) => {
        button.addEventListener('click',(button) => {
            processButton(button);
        });
    });
}

function operate(calculationArray) {
    if(calculationArray[1] === '+')
        return Math.round(((+calculationArray[0] + +calculationArray[2]) + Number.EPSILON) * 1000000) / 1000000;
    if(calculationArray[1] === '-')
        return Math.round(((+calculationArray[0] - +calculationArray[2]) + Number.EPSILON) * 1000000) / 1000000;
    if(calculationArray[1] === '*')
        return Math.round(((+calculationArray[0] * +calculationArray[2]) + Number.EPSILON) * 1000000) / 1000000;
    if(calculationArray[1] === '/') {
        if(calculationArray[2] === '0')
            return 'ERROR';
        else
            return Math.round(((+calculationArray[0] / +calculationArray[2]) + Number.EPSILON) * 1000000) / 1000000; 
    }
}

function clearCalculationArray() {
    calculationArray = ['','',''];
}

function processButton(button) { 
    if(button.srcElement.classList.value === 'number' && calculationArray[1] === '' && calculationArray[2] === '') {
        calculationArray[0] += button.srcElement.textContent;
        document.querySelector('.text').textContent = calculationArray[0];
    }

    if(button.srcElement.classList.value === 'number' && calculationArray[0] !== '' && calculationArray[1] !== '') {
        calculationArray[2] += button.srcElement.textContent;
        document.querySelector('.text').textContent = calculationArray[2];
    }

    if(button.srcElement.classList.value === 'utility' && calculationArray[0] !== '' && calculationArray[2] === '') {
        calculationArray[1] += button.srcElement.textContent;
    }

    if(button.srcElement.classList.value === 'equal' && calculationArray[0] !== '' && calculationArray[1] !== '' && calculationArray [2] !== '') {
        document.querySelector('.text').textContent = operate(calculationArray);
        clearCalculationArray();
    }

    if(button.srcElement.classList.value === 'utility' && calculationArray[0] !== '' && calculationArray[1] !== '' && calculationArray [2] !== '') {
        console.log(calculationArray);
        document.querySelector('.text').textContent = operate(calculationArray);
        calculationArray[0] = operate(calculationArray);
        calculationArray[1] = button.srcElement.textContent;
        calculationArray[2] = '';
        console.log(calculationArray);
    }

    if(button.srcElement.classList.value === 'clear')
    {
        clearCalculationArray();
        document.querySelector('.text').textContent = '0000000';
    }

    if(button.srcElement.classList.value === 'delete' && calculationArray[1] === '' && calculationArray[2] === '') {
        calculationArray[0] = (`${calculationArray[0]}`).substring(0,(`${calculationArray[0]}`).length-1);
        document.querySelector('.text').textContent = calculationArray[0];
    }

    if(button.srcElement.classList.value === 'delete' && calculationArray[0] !== '' && calculationArray[1] !== '') {
        calculationArray[2] = (`${calculationArray[2]}`).substring(0,(`${calculationArray[2]}`).length-1);
        document.querySelector('.text').textContent = calculationArray[2];
    }
    
    if(button.srcElement.classList.value === 'decimal' && calculationArray[1] === '' && calculationArray[2] === '' && calculationArray[0].indexOf(".") === -1) {
        calculationArray[0] += button.srcElement.textContent;
        document.querySelector('.text').textContent = calculationArray[0];
    }

    if(button.srcElement.classList.value === 'decimal' && calculationArray[0] !== '' && calculationArray[1] !== '' && calculationArray[2].indexOf(".") === -1) {
        calculationArray[2] += button.srcElement.textContent;
        document.querySelector('.text').textContent = calculationArray[2];
    }
}

intialiseButtons();
let calculationArray = ['','',''];