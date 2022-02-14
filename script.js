// Seletores e variáveis
const buttonStart = document.querySelector('.start');
let json;

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
  const attempt = document.querySelector('.game-input').value.toLowerCase().trim();
  const message = document.querySelector('.game-over-message');
  const animalName = document.querySelector('.game-name-animal');
  const buttons = document.querySelectorAll('.game-button');

  if (json.name.toLowerCase().match(`\\b${attempt}\\b`) && attempt !== "") {
    disabledButton(buttons);
    message.style.color = 'green';
    message.innerText = 'You win!!';
    animalName.innerText = json.name;
  } else {
    const up = document.querySelector('.game-attempts');
    const heart = [...up.querySelectorAll('.full-heart')].slice(-1)[0];
    if (heart) {
      heart.src = 'img/heart-empty.png';
      heart.className = 'empty-heart';
      if (!up.querySelector('.full-heart')) {
        disabledButton(buttons);
        message.style.color = 'red';
        message.innerText = 'You lose!!';
        animalName.innerText = json.name;
      }
    }
  }
}

const createGameHints = (data) => {
  const hints = [];
  
  hints.push(`Its scientific name is ${data.latin_name}`);
  hints.push(`This animal is ${data.active_time}`);
  hints.push(`Its maximum size is ${data.length_max} feet and its minimum size is ${data.length_min} feet`);
  hints.push(`Its maximum weight is ${data.weight_max} pounds and its minimum weight is ${data.weight_min} pounds`);
  hints.push(`Its habitat is ${data.habitat}`);
  hints.push(`This animal eats ${data.diet}`);
  hints.push(`This animal inhabits the region of ${data.geo_range}`);

  console.log(hints);
  return hints;
}

const getHint = (hints) => {
  const olHint = document.querySelector('.game-list-hint');
  const random = Math.floor(Math.random() * hints.length);
  
  olHint.appendChild(createGameElement('li', 'game-hint-item', hints.splice(random, 1)));

  if (hints.length === 0) {
    const hintButton = document.querySelectorAll('.game-button')[1];
    hintButton.disabled = true;
  }
  
}

const createHeart = (src) => {
  const img = document.createElement('img');
  img.className = 'full-heart';
  img.src = src;
  return img
}

const createHeartsSection = () => {
  const section = createGameElement('section', 'game-attempts');
  section.appendChild(createHeart('img/heart.png'));
  section.appendChild(createHeart('img/heart.png'));
  section.appendChild(createHeart('img/heart.png'));
  return section;
}

const createAnswerSection = () => {
  const section = document.createElement('section');
  const hints = createGameHints(json);

  section.appendChild(createHeartsSection());
  section.appendChild(createGameElement('input', 'game-input'));

  const buttonsSection = createGameElement('section', 'buttons-section');
  buttonsSection.appendChild(createGameElement('button', 'game-button', 'Guess', tryToGuess));
  buttonsSection.appendChild(createGameElement('button', 'game-button', 'Hint', () => getHint(hints)));
  section.appendChild(buttonsSection);

  return section;
}

const createMegaSection = (image) => {
  const megaSection = createGameElement('section', 'container-image-hint');
  const olHints = createGameElement('ol', 'game-list-hint');
  const img = document.createElement('img');
  img.src = image;
  img.className = 'game-main-img';

  megaSection.appendChild(img);
  megaSection.appendChild(olHints);
  return megaSection;
}

const createGameContainer = (data) => {
  buttonStart.remove();
  const principal = document.querySelector('.principal');
  json = data;

  const gameContainer = document.createElement('section');
  gameContainer.className = 'game-container';

  gameContainer.appendChild(createGameElement('section', 'game-name-animal'));
  gameContainer.appendChild(createMegaSection(json.image_link));
  gameContainer.appendChild(createAnswerSection());
  gameContainer.appendChild(createGameElement('section', 'game-over-message'));

  principal.appendChild(gameContainer);
}

const startGame = async () => {
  const data = await fetchAnimal();
  createGameContainer(data);
}

window.onload = () => {
  buttonStart.addEventListener('click', startGame);
}