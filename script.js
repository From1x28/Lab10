
const fruits = [
    { name: 'apple', symbol: '🍎' },
    { name: 'pear', symbol: '🍐' },
    { name: 'lemon', symbol: '🍋' },
    { name: 'peach', symbol: '🍑' },
    { name: 'cherry', symbol: '🍒' }
];

let attemptsLeft = 3;
let userName = "";

function initUser() {
    while (true) {
        let input = prompt("Будь ласка, введіть ваше ім'я:", "User");
        
        if (input === null) {
            userName = "User"; 
            break;
        }
        
        input = input.trim();
      
        if (input.length > 0 && input.length <= 20) {
            userName = input;
            break;
        } else {
            alert("Ім'я не може бути порожнім і має містити до 20 символів. Спробуйте ще раз.");
        }
    }
    
    document.getElementById("user-name").textContent = userName;
}

function getRandomColumnFruits() {
    let shuffled = [...fruits].sort(() => 0.5 - Math.random());
    return [shuffled[0], shuffled[1], shuffled[2]];
}

function renderBoard(boardData) {
    for (let col = 0; col < 3; col++) {
        const columnElement = document.getElementById(`col-${col}`);
        const cells = columnElement.querySelectorAll('.slot-cell');
        
        for (let row = 0; row < 3; row++) {
            cells[row].textContent = boardData[col][row].symbol;
        }
    }
}

function initBoard() {
    const initialData = [
        getRandomColumnFruits(),
        getRandomColumnFruits(),
        getRandomColumnFruits()
    ];
    renderBoard(initialData);
}

function checkWin(boardData) {
    for (let row = 0; row < 3; row++) {
        let fruit1 = boardData[0][row].name;
        let fruit2 = boardData[1][row].name;
        let fruit3 = boardData[2][row].name;
        
        if (fruit1 === fruit2 && fruit2 === fruit3) {
            return true; 
        }
    }
    return false;
}

document.getElementById("generate-btn").addEventListener("click", () => {
    if (attemptsLeft <= 0) return;

    const currentBoard = [
        getRandomColumnFruits(),
        getRandomColumnFruits(),
        getRandomColumnFruits()
    ];

    renderBoard(currentBoard);

    if (checkWin(currentBoard)) {
        document.getElementById("message").textContent = `🎉 Вітаємо, ${userName}! Ви виграли!`;
        document.getElementById("message").style.color = "#27ae60";
        endGame();
        return;
    }

    attemptsLeft--;
    document.getElementById("attempts").textContent = `Спроба ${4 - attemptsLeft} з 3`;

    if (attemptsLeft === 0) {
        document.getElementById("message").textContent = `❌ Гра закінчена. На жаль, ви не виграли.`;
        document.getElementById("message").style.color = "#c0392b";
        endGame();
    }
});

function endGame() {
    const btn = document.getElementById("generate-btn");
    btn.disabled = true;
    btn.style.backgroundColor = "#95a5a6";
    btn.style.boxShadow = "none";
}

window.onload = () => {
    initUser();
    initBoard();
};