// Seletores e variáveis
const buttonStart = document.querySelector('.start');

// Funções
const createGameElement = (element, className, text = null, callbackListener) => {
  const elem = document.createElement(element);
  elem.innerText = text;
  elem.className = className;
  
  if (callbackListener) {
    elem.addEventListener('click', callbackListener);
  }
  return elem;
}

const tryToGuess = () => {

}

const getHint = () => {
  
}

const createAnswerSection = () => {
  const section = document.createElement('section');

  section.appendChild(createGameElement('input', 'game-input'));
  section.appendChild(createGameElement('button', 'game-button', 'Guess', tryToGuess));
  section.appendChild(createGameElement('button', 'game-button', 'Hint', getHint));

  return section;
}

const createGameImage = (image) => {
  const img = document.createElement('img');
  img.src = image;
  img.className = 'game-main-img';
  return img;
}

const createGameContainer = (data) => {
  buttonStart.remove();
  const principal = document.querySelector('.principal');

  const gameContainer = document.createElement('section');
  gameContainer.className = 'game-container';

  gameContainer.appendChild(createGameImage(data.image_link));

  gameContainer.appendChild(createAnswerSection());

  const hints = document.createElement('ol');
  hints.classList = 'game-list';
  const hint = document.createElement('li');
  hint.innerText = 'teste';
  hints.appendChild(hint);
  gameContainer.appendChild(hints);

  principal.appendChild(gameContainer);
}

const startGame = async () => {
  const data = await fetchAnimal();
  createGameContainer(data);
} 

window.onload = () => {
  buttonStart.addEventListener('click', startGame);
}