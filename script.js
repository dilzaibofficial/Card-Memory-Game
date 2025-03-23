const cards = document.querySelectorAll(".card");
let flippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let matchedPairs = 0;

const categories = {
  fruits: ["🍎", "🍌", "🍇", "🍉", "🍓", "🍒", "🍑", "🍍"],
  diamonds: ["💎", "🔷", "🔶", "🔸", "🔹", "♦️", "♢", "♤"],
  animals: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"],
  birds: ["🦅", "🦆", "🦉", "🦜", "🐦", "🐧", "🐤", "🦢"],
};

let currentCategory = getRandomCategory();
let shuffledEmojis = shuffle([...currentCategory, ...currentCategory]);

cards.forEach((card, index) => {
  card.dataset.framework = shuffledEmojis[index];
  card.addEventListener("click", flipCard);
});

function getRandomCategory() {
  const keys = Object.keys(categories);
  return categories[keys[Math.floor(Math.random() * keys.length)]];
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function flipCard() {
  if (lockBoard || this === firstCard) return;

  this.classList.add("flipped");

  if (!flippedCard) {
    flippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkMatch();
}

function checkMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  matchedPairs++;
  if (matchedPairs === currentCategory.length) {
    setTimeout(showFireworks, 500);
  }
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [flippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function showFireworks() {
  document.body.classList.add("fireworks");
  setTimeout(() => {
    document.body.classList.remove("fireworks");
    restartGame();
  }, 2000);
}

function restartGame() {
  matchedPairs = 0;
  currentCategory = getRandomCategory();
  shuffledEmojis = shuffle([...currentCategory, ...currentCategory]);
  cards.forEach((card, index) => {
    card.classList.remove("flipped");
    card.dataset.framework = shuffledEmojis[index];
    card.addEventListener("click", flipCard);
  });
}
