const btnStart = document.getElementById('btn1');
const btnFinish = document.getElementById('btn2');
const btnNextLevel = document.getElementById('btn3')
const container = document.getElementById('container');
const timerBox = document.getElementById('timer');
const message = document.getElementById('message');
const audio = document.getElementById('audio');
const audioClick = document.getElementById('audio_click');
const audioMiss = document.getElementById('audio_miss');
let numbers = [];
let targetNumber = 1;
let rows;
let columns;
let intervalId;
let timer = 60;

// Функция генерирует числа от 1 до заданного числа(вычисляемого из произведения заданных в аргументы чисел),
// далее добавляет их в пустой массив numbers и перемешивает массив в рандомном порядке.

const generateNumbers = (row, col) => {
    let end = numbers.length;
    numbers.splice(0, end);
    let result = row * col;
    for (let i = 1; i < result + 1; i++) {
        numbers.push(i);
    }
    numbers.sort(() => Math.random() - 0.5);
}
//  Функция возвращает случайное число  в диапазоне от минимального до максимального.

const getRandomNumberInRange = (min, max) => {
    return Math.ceil(Math.random() * (max - min) + min);
};

// Функция создает дивы с цифрами рандомного размера и цвета внутри, после чего заполняет 
// родительский контейнер данными дивами (количество дивов является результатом вычисления произведения кол-ва колонок на кол-во),

const creatTable = () => {
    numbers.forEach((e) => {
        const box = document.createElement('div');
        box.classList.add('box');
        box.style.fontSize = `${getRandomNumberInRange(20, 60) + 'px'}`;
        box.style.color = `rgb(${getRandomNumberInRange(0, 255)}, ${getRandomNumberInRange(0, 255)}, ${getRandomNumberInRange(0, 255)})`;
        box.textContent = e;
        container.append(box);
    })
}

// Функция удаляет все элементы из родительского контейнера игрового поля.

const deleteTable = () => {
    container.replaceChildren();
};

btnStart.addEventListener('click', () => {
    rows = 5;
    columns = 5;
    message.classList.add('hide');
    audio.play();
    generateNumbers(rows, columns);
    creatTable(rows, columns);
    timerBox.classList.add('show');
    timerBox.textContent = timer;
    intervalId = setInterval(() => {
        timer -= 1;
        timerBox.textContent = timer;
        if (timer === 30) {
            timerBox.style.color = 'rgb(201, 195, 35)'
        };
        if (timer === 10) {
            timerBox.style.color = 'rgb(201, 35, 35)'
        };
        if (timer === 0) {
            message.classList.remove('hide');
            message.textContent = 'Вы проиграли!';
            deleteTable();
            clearInterval(intervalId);
        };
    }, 1000);

    btnStart.classList.add('hide');
    btnFinish.classList.add('show');
});

btnFinish.addEventListener('click', () => {
    deleteTable();
    clearInterval(intervalId);
    targetNumber = 1;
    timer = 60;
    message.classList.remove('hide');
    message.textContent = 'Найди цифры от 1 до 25 по порядку';
    btnFinish.classList.remove('show');
    btnStart.classList.remove('hide');
    timerBox.classList.remove('show');
})

btnNextLevel.addEventListener('click', () => {
    deleteTable();
    clearInterval(intervalId);
    targetNumber = 1;
    timer = 60;
    rows = 7;
    columns = 5;
    generateNumbers(rows, columns);
    creatTable(rows, columns);
    timerBox.classList.add('show');
    timerBox.textContent = timer;
    intervalId = setInterval(() => {
        timer -= 1;
        timerBox.textContent = timer;
        if (timer === 30) {
            timerBox.style.color = 'rgb(201, 195, 35)'
        };
        if (timer === 10) {
            timerBox.style.color = 'rgb(201, 35, 35)'
        };
        if (timer === 0) {
            message.classList.remove('hide');
            message.textContent = 'Вы проиграли!';
            deleteTable();
            clearInterval(intervalId);
        };
    }, 1000);
    message.classList.add('hide');
    btnNextLevel.classList.add('hide');
});

container.addEventListener('click', (event) => {

    const target = event.target;

    if (target === container) {
        return;
    }
    if (targetNumber == target.textContent) {
        targetNumber += 1;
        target.style.backgroundColor = '#306b3bab';
        target.classList.add('anim');
        audioClick.play();
    } else {
        target.style.backgroundColor = 'rgb(123 ,50 ,77 ,0.67)';
        audioMiss.play();
        setTimeout(() => {
            target.style.backgroundColor = (targetNumber >= target.textContent) ? '#306b3bab' : 'rgb(88, 76, 60, .5)';
        }, 500);
    };
    if (targetNumber === 26 && numbers.length === 25) {
        deleteTable();
        clearInterval(intervalId);
        message.classList.remove('hide');
        message.textContent = 'Вы справились!';
        btnNextLevel.classList.remove('hide');
    };
    if (targetNumber === 36 && numbers.length === 35) {
        deleteTable();
        clearInterval(intervalId);
        message.classList.remove('hide');
        message.textContent = 'Вы справились!';
        btnFinish.classList.add('show');
        btnNextLevel.classList.add('show');
    };

});
