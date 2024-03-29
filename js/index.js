const btnStart = document.getElementById('btn1');
const btnFinish = document.getElementById('btn2');
const btnNextLevel = document.getElementById('btn3')
const mainGamingField = document.getElementById('main-gaming-field');
const timerBox = document.getElementById('timer');
const message = document.getElementById('message');
const audioFirstLevel = document.getElementById('audio');
const audioSecondLevel = document.getElementById('audio2');
const audioClick = document.getElementById('audio-click');
const audioMiss = document.getElementById('audio-miss');
const audioComplete = document.getElementById('audio-complete');
const audioLoose = document.getElementById('audio-loose');
const example = document.getElementById('example');

const numbers = [];
let targetNumber = 1;
let rows;
let columns;
let intervalId;
let timer = 60;

window.onload = () => {
    message.classList.add('message-anim')
}

const generateNumbers = (row, col) => {
    let end = numbers.length;
    numbers.splice(0, end);
    let result = row * col;
    for (let i = 1; i < result + 1; i++) {
        numbers.push(i);
    }
    numbers.sort(() => Math.random() - 0.5);
}

const getRandomNumberInRange = (min, max) => {
    return Math.ceil(Math.random() * (max - min) + min);
};

const creatTable = () => {
    numbers.forEach((e) => {
        const gameField = document.createElement('div');
        gameField.classList.add('game-field');
        gameField.style.fontSize = `${getRandomNumberInRange(30, 60) + 'px'}`;
        gameField.style.color = `rgb(${getRandomNumberInRange(0, 255)}, ${getRandomNumberInRange(0, 255)}, ${getRandomNumberInRange(0, 255)})`;
        gameField.textContent = e;
        mainGamingField.append(gameField);
        if (window.innerWidth < 500 && numbers.length > 25) {
            gameField.classList.add('shrink')
        } return
    })
}

const deleteTable = () => {
    mainGamingField.replaceChildren();
};

const changingTimer = () => {
    timer -= 1;
    timerBox.textContent = timer;
    if (timer === 30) {
        timerBox.style.color = 'rgb(255 247 46)'
    };
    if (timer === 10) {
        timerBox.style.color = 'rgb(201, 35, 35)'
    };
    if (timer === 0) {
        audioFirstLevel.pause()
        audioSecondLevel.pause()
        audioLoose.play()
        message.classList.add('message-congratulation')
        message.classList.remove('hide');
        message.textContent = 'You loose! xD';
        deleteTable();
        timerBox.classList.remove('show')
        clearInterval(intervalId);
    };
}

btnStart.addEventListener('click', () => {
    rows = 5;
    columns = 5;
    message.classList.add('hide');
    audioFirstLevel.load()
    audioFirstLevel.play()
    generateNumbers(rows, columns);
    creatTable(rows, columns);
    timerBox.classList.add('show');
    timerBox.textContent = timer;
    intervalId = setInterval(changingTimer, 1000);
    example.classList.add('hide')
    btnStart.classList.add('hide');
    btnFinish.classList.add('btn-move')
    audioClick.play();
});

btnFinish.addEventListener('click', () => {
    deleteTable();
    clearInterval(intervalId);
    targetNumber = 1;
    timer = 60;
    audioFirstLevel.pause();
    audioSecondLevel.pause();
    message.classList.remove('message-win');
    btnNextLevel.setAttribute('disabled', true);
    btnNextLevel.classList.add('disabled')
    message.classList.remove('hide');
    message.classList.remove('message-congratulation')
    message.textContent = 'Find in order all the numbers from 1 and up';
    example.classList.remove('hide')
    btnStart.classList.remove('hide');
    timerBox.classList.remove('show');
    btnFinish.classList.remove('btn-move')
    audioClick.play();
})

btnNextLevel.addEventListener('click', () => {
    audioSecondLevel.load();
    audioSecondLevel.play();
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
    intervalId = setInterval(changingTimer, 1000);
    message.classList.add('hide');
    btnNextLevel.setAttribute('disabled', true);
    btnNextLevel.classList.add('disabled');
    audioClick.play();
});

mainGamingField.addEventListener('click', (event) => {

    const target = event.target;

    if (target === mainGamingField) {
        return;
    }
    if (targetNumber == target.textContent) {
        targetNumber += 1;
        target.style.backgroundColor = '#306b3bab';
        target.classList.add('anim');
        audioClick.play();
    } else {
        target.style.backgroundColor = 'rgb(123,50,77,0.67)';
        audioMiss.play();
        setTimeout(() => {
            target.style.backgroundColor = (targetNumber >= target.textContent) ? '#306b3bab' : 'rgb(88, 76, 60, .5)';
        }, 500);
    };
    if (targetNumber === 26 && numbers.length === 25) {
        audioComplete.play()
        deleteTable();
        clearInterval(intervalId);
        message.classList.remove('hide');
        message.classList.add('message-congratulation');
        message.textContent = 'Level completed!';
        btnNextLevel.removeAttribute('disabled');
        btnNextLevel.classList.remove('disabled');
        timerBox.classList.remove('show')
        audioFirstLevel.pause()
    };
    if (targetNumber === 36 && numbers.length === 35) {
        audioComplete.play()
        deleteTable();
        clearInterval(intervalId);
        message.classList.remove('hide');
        message.classList.add('message-win');
        message.textContent = 'You win!';
        timerBox.classList.remove('show')
        btnNextLevel.setAttribute('disabled', true);
        btnNextLevel.classList.add('disabled')
        audioSecondLevel.pause()
    };

});
