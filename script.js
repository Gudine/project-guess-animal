// Seletores e variáveis
const buttonStart = document.querySelector('.start');

// Funções
const createAnswerSection = () => {
  const section = document.createElement('section');

  const answerBox = document.createElement('input');
  answerBox.className = 'game-input';
  section.appendChild(answerBox);

  const guessBtn = document.createElement('button');
  guessBtn.innerText = 'Guess';
  guessBtn.className = 'game-button';
  section.appendChild(guessBtn);

  const hintBtn = document.createElement('button');
  hintBtn.innerText = 'Hint';
  hintBtn.className = 'game-button';
  section.appendChild(hintBtn);

  return section;
}

const createGameContainer = () => {
  buttonStart.remove();
  const principal = document.querySelector('.principal');

  const gameContainer = document.createElement('section');
  gameContainer.className = 'game-container';

  const img = document.createElement('img');
  img.src = 'https://upload.wikimedia.org/wikipedia/commons/9/90/Boa_constrictor,_Vaňkovka,_Brno_(2).jpg';
  img.className = 'game-main-img';
  gameContainer.appendChild(img);

  const answerSection = createAnswerSection();
  gameContainer.appendChild(answerSection);

  const hints = document.createElement('ol');
  hints.classList = 'game-list';
  const hint = document.createElement('li');
  hint.innerText = 'teste';
  hints.appendChild(hint);
  gameContainer.appendChild(hints);

  principal.appendChild(gameContainer);
}

const startGame = () => {
  createGameContainer();
} 

window.onload = () => {
  buttonStart.addEventListener('click', startGame);
}