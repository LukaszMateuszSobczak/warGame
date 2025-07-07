`use strict`;

const getDeckBtn = document.querySelector('#getDeckBtn');
const getCardsBtn = document.querySelector('#getCardsBtn');
const cardsBox = document.querySelector('#cardsBox');
const computerScoreEle = document.querySelector('#computerScore');
const userScoreEle = document.querySelector('#userScore');
const remainingCardsEle = document.querySelector('#remainingCards');

getCardsBtn.disabled = true;

let computerScore = 0;
let userScore = 0;

let deckId;

const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

const removeOldCards = async () => {
    document.querySelector('#card1').classList.add('cards-out');
    document.querySelector('#card2').classList.add('cards-out');
    await sleep(1000)
};

const clearCards = async (remainingCards) => {
    if (document.querySelector('#card1')) {
        await removeOldCards(); 
    }

    cardsBox.innerHTML = `
        <div class="cards-slot"></div>
        <div class="cards-slot"></div>
    `;
    if (remainingCards != undefined) {
        computerScore = 0;
        userScore = 0;
        computerScoreEle.textContent = `Computer: ${computerScore}`;
        userScoreEle.textContent = `Me: ${userScore}`;
        remainingCardsEle.textContent = `Remaining cards: ${remainingCards}`;
    }
};

const addCardImage = (cards) => {
    let idx = 0;
    for (let card of cards) {
        const imgEle = document.createElement('img');
        imgEle.setAttribute('src', card.image);
        imgEle.setAttribute('width', '100%');
        imgEle.setAttribute('height', '100%');
        imgEle.id = `card${idx + 1}`;
        imgEle.className = idx === 0 ? 'slide-in-left' : 'slide-in-right';
        cardsBox.children[idx].append(imgEle);
        idx++;
    }
};

const getValue = (cardValue) => {
    const cardsValues = {
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9,
        10: 10,
        JACK: 11,
        QUEEN: 12,
        KING: 13,
        ACE: 14,
    };
    return cardsValues[cardValue];

    // for (let value in cardsValues) {
    //     if (value === cardValue) {
    //         return cardsValues[value];
    //     }
    // }
};

const showModal = (modalText = 'Please get new deck first') => {
    document.querySelector('#modalText').textContent = modalText;
    document.querySelector('#modalWindow').classList.add('show');
    getCardsBtn.disabled = true;
    setTimeout(() => {
        document.querySelector('#modalWindow').classList.remove('show');
        if (modalText != 'Please get new deck first') {
            getCardsBtn.disabled = false;
        }
    }, 2000);
};

const resolveWhoWin = (cards) => {
    let computerCard = getValue(cards[0].value);
    let userCard = getValue(cards[1].value);

    if (computerCard > userCard) {
        computerScore += 1;
        computerScoreEle.textContent = `Computer: ${computerScore}`;
        showModal('Computer won +1');
    } else if (userCard > computerCard) {
        userScore += 1;
        userScoreEle.textContent = `Me: ${userScore}`;
        showModal('You won +1');
    } else {
        showModal('Tie!');
    }
};

const getDeck = () => {
    getCardsBtn.disabled = false;
    fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        .then((res) => res.json())
        .then((data) => {
            deckId = data.deck_id;
            clearCards(data.remaining);
        });
};

const getCards = () => {
    fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
        .then((res) => res.json())
        .then(async (data) => {
            await clearCards();
            remainingCardsEle.textContent = `Remaining cards: ${data.remaining}`;
            addCardImage(data.cards);
            await sleep(1000);
            resolveWhoWin(data.cards);
        });
};

getDeckBtn.addEventListener('click', getDeck);
getCardsBtn.addEventListener('click', getCards);

getCardsBtn.addEventListener('mouseover', () => {
    if (deckId === undefined) {
        showModal();
    }
});
