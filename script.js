const statusDisplay = document.querySelector('.game--status');
const cells = document.querySelectorAll('.cell');
const gameContainer = document.querySelector('.game--container');

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

let playerX = prompt("Enter Player X's name:", "Player X");
let playerO = prompt("Enter Player O's name:", "Player O");

const getPlayerName = () => (currentPlayer === "X" ? playerX : playerO);

const winningMessage = () => `${getPlayerName()} WINS!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${getPlayerName()}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

const winningConditions = [
    [0, 1, 2], 
    [3, 4, 5],  
    [6, 7, 8],  
    [0, 3, 6],  
    [1, 4, 7], 
    [2, 5, 8],  
    [0, 4, 8],  
    [2, 4, 6]   
];

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleResultValidation() {
    let roundWon = false;
    let winningCells = [];

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            winningCells = [a, b, c];
            drawWinningLine(i);
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    if (!gameState.includes("")) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

function drawWinningLine(index) {
    const positions = [
        "row-top", "row-middle", "row-bottom",
        "col-left", "col-middle", "col-right",
        "diag-main", "diag-anti"
    ];
    gameContainer.classList.add(positions[index]);
}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive)
        return;

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();

    cells.forEach(cell => cell.innerHTML = "");
    gameContainer.className = "game--container"; 
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);
