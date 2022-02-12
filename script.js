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
  const attempt = document.querySelector('.game-input').value;
  const correctName = document.querySelector('.game-name-animal').innerText;
  const message = document.querySelector('.game-over-message');

  if (attempt === correctName) {
    message.style.color = 'green';
    message.innerText = 'You win!!';
  } else {
    const up = document.querySelector('.game-attempts');
    up.innerText = parseInt(up.innerText) - 1;
    if (up.innerText === '0') {
      const buttons = document.querySelectorAll('.game-button');
      buttons.forEach((button) => button.disabled = true);
      message.style.color = 'red';
      message.innerText = 'You lose!!';
    }
  }
}

const getHint = () => {
  
}

const createAnswerSection = () => {
  const section = document.createElement('section');

  section.appendChild(createGameElement('span', 'game-attempts', '3'));
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

  gameContainer.appendChild(createGameElement('span', 'game-name-animal', data.name));
  gameContainer.appendChild(createGameImage(data.image_link));
  gameContainer.appendChild(createAnswerSection());
  gameContainer.appendChild(createGameElement('ol', 'game-list'));
  gameContainer.appendChild(createGameElement('span', 'game-over-message'));

  principal.appendChild(gameContainer);
}

const startGame = async () => {
  const data = await fetchAnimal();
  createGameContainer(data);
} 

window.onload = () => {
  buttonStart.addEventListener('click', startGame);
}