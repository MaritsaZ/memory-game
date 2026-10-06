const app = document.createElement('div');//это создание элемента div

app.classList.add('app');//это добавление класса app к элементу div

document.body.append(app);//это добавление элемента div в тело документа

const header = document.createElement('header');//это создание элемента header

header.classList.add('header');

app.append(header);

const title = document.createElement('h1');//это создание элемента h1

title.classList.add('title');

title.textContent = 'Memory Game';//это добавление текста в элемент h1

header.append(title);//это добавление элемента h1 в элемент header

const headerButtons = document.createElement('div');//это создание элемента div
headerButtons.classList.add('header-buttons');//это добавление класса header-buttons к элементу div

header.append(headerButtons);//это добавление элемента div в элемент header

const newGameButton = document.createElement('button');//это создание элемента button
newGameButton.classList.add('new-game-button');
newGameButton.textContent = 'New Game';

headerButtons.append(newGameButton);//это добавление элемента button в элемент div

const leaderboardButton = document.createElement('button');//это создание 
//элемента button открывает таблицу лидеров игры

leaderboardButton.classList.add('leaderboard-button');
leaderboardButton.textContent = 'Leaderboard';


const main = document.createElement('main');//это создание элемента main

main.classList.add('main');

app.append(main);

const gameInfo = document.createElement('div');
gameInfo.classList.add('game-info');

const moves = document.createElement('p');
moves.classList.add('moves');
moves.textContent = 'Moves: 0';

const pairs = document.createElement('p');
pairs.classList.add('pairs');
pairs.textContent = 'Pairs: 0 / 8';

gameInfo.append(moves);
gameInfo.append(pairs);

main.append(gameInfo);

const gameBoard = document.createElement('div');
gameBoard.classList.add('game-board');

main.append(gameBoard);

const cardValues = [
    'cat',
    'dog',
    'fox',
    'panda',
    'rabbit',
    'lion',
    'frog',
    'koala',
];

const cards = [...cardValues, ...cardValues];

function shuffleCards(cards) {
    for (let i = cards.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));//это генерация случайного индекса от 0 до i включительно

        [cards[i], cards[randomIndex]] = [cards[randomIndex], cards[i]];
    }
}


let firstCard = null;
let secondCard = null;
let isLocked = false;
let movesCount = 0;
let pairsCount = 0;
let mismatchTimer = null;

function createGame() {
    if (mismatchTimer !== null) {
        clearTimeout(mismatchTimer);
        mismatchTimer = null;
    }

    firstCard = null;
    secondCard = null;
    isLocked = false;

    movesCount = 0;
    pairsCount = 0;

    moves.textContent = 'Moves: 0';
    pairs.textContent = 'Pairs: 0 / 8';

    gameBoard.replaceChildren();

    shuffleCards(cards);


    cards.forEach((cardValue) => {
        const card = document.createElement('button');

        card.classList.add('card');

        card.dataset.value = cardValue;
        card.textContent = '?';

        card.addEventListener('click', () => {
            if (isLocked) {
                return;
            }

            if (card.classList.contains('matched')) {
                return;
            }

            if (firstCard === null) {
                firstCard = card;
                card.textContent = card.dataset.value;
                return;
            }

            if (card === firstCard) {
                return;
            }

            secondCard = card;
            card.textContent = card.dataset.value;
            movesCount++;
            moves.textContent = `Moves: ${movesCount}`;

            if (firstCard.dataset.value === secondCard.dataset.value) {
                firstCard.classList.add('matched');
                secondCard.classList.add('matched');

                pairsCount++;
                pairs.textContent = `Pairs: ${pairsCount} / 8`;

                firstCard = null;
                secondCard = null;
            } else {
                isLocked = true;

                mismatchTimer = setTimeout(() => {
                    firstCard.textContent = '?';
                    secondCard.textContent = '?';

                    firstCard = null;
                    secondCard = null;
                    isLocked = false;
                    mismatchTimer = null;
                }, 1000);
            }
        });

        gameBoard.append(card);
    });
}

createGame();
newGameButton.addEventListener('click', () => {
    createGame();
});

headerButtons.append(leaderboardButton);