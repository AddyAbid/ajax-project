
var $view = document.querySelectorAll('.view');
var $viewCharButton = document.querySelector('.view-button');
var $parentListView = document.querySelector('.char-list');
var $input = document.querySelector('#searchData');
var gameOptions = document.querySelector('.parent-game-row');
var $gameButtonMobile = document.querySelector('.game-button-mobile');
var $gameButtonDesktop = document.querySelector('.game-button-desktop');
var $gameContainer = document.querySelector('.parent-game-row');
var $dashboardButton = document.querySelector('.dash-button');
var $playAgain = document.querySelector('.play-again-button');
var $modal = document.querySelector('.modal');
var hideDetails = document.querySelector('.hidden-card');
var $score = document.querySelector('.number');
var timerId = null;
var rightAnswer = 0;
var questionCounter = 0;

document.addEventListener('click', saveCharEvent);
document.addEventListener('click', showCharDetails);
document.addEventListener('click', clearData);
document.addEventListener('click', hideCharDetails);
$viewCharButton.addEventListener('click', showCharList);
$dashboardButton.addEventListener('click', swapView);
$playAgain.addEventListener('click', generateRandomNewGame);
$gameButtonMobile.addEventListener('click', generateRandom);
$gameButtonDesktop.addEventListener('click', generateRandom);
$input.addEventListener('submit', submitData);
document.addEventListener('click', viewHandler);
document.addEventListener('DOMContentLoaded', renderSearchResults);

function swapView(viewName) {
  if (!event.target.matches('.select')) {
    return;
  }
  $modal.classList.add('hidden');
  for (var i = 0; i < $view.length; i++) {
    var $dataView = event.target.getAttribute('data-view');
    var $newView = $view[i].getAttribute('data-view');
    if ($dataView === $newView) {
      $view[i].className = 'container view';
    } else {
      $view[i].className = 'container view hidden';
    }

  }
  if (event.target.matches('.home')) {

    var position = document.querySelector('.mb-1rem');
    position.textContent = '';
  }
  data.view = viewName;

}

function viewHandler(event) {
  if (!event.target.matches('.button')) {
    return;
  }
  swapView(event.target.getAttribute('data-view'));
}

function submitData(event) {
  event.preventDefault();
  swapView(data.view);
  var characterSearched = {
    searched: $input.input.value
  };
  var name = characterSearched.searched;
  getCharacterData(name);
  $input.reset();
}

function getCharacterData(name) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://rickandmortyapi.com/api/character/?name=' + name);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var matchingCharacters = xhr.response.results;
    var position = document.querySelector('.mb-1rem');

    for (var i = 0; i < matchingCharacters.length; i++) {

      position.appendChild(renderSearchResults(matchingCharacters[i]));
    }

  }
  );
  xhr.send();
}

function getRandomChar(randomNumArray) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://rickandmortyapi.com/api/character?page=' + generateSingleRandomNumber(0, 41));
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var eachChar = [];
    var matchingCharacters = xhr.response.results;
    for (var j = 0; j < randomNumArray.length; j++) {
      var allAnswers = matchingCharacters[randomNumArray[j]];
      eachChar.push(allAnswers);
    }

    var randomIndex = Math.floor(Math.random() * eachChar.length);

    function answerClick(event) {
      clickAnswer(eachChar, randomIndex);
      gameOptions.removeEventListener('click', answerClick);
    }
    gameOptions.appendChild(renderRandomGame(eachChar, randomIndex));
    gameOptions.addEventListener('click', answerClick);
    gameOptions.addEventListener('click', renderRandomGame);
    gameOptions.addEventListener('click', getRandomChar);

  });
  xhr.send();
}

function clickAnswer(eachChar, randomIndex) {
  timerId = setTimeout(generateRandom, 1000);

  data.characterData.push(eachChar[randomIndex]);

  if (event.target.tagName !== 'H3') {
    return;
  }
  if (event.target.textContent === eachChar[randomIndex].name) {
    rightAnswer++;

    event.target.style.backgroundColor = 'green';
    event.target.style.borderRadius = '8px';
    event.target.style.color = 'white';

  } else {

    event.target.style.backgroundColor = 'red';
    event.target.style.borderRadius = '8px';
    event.target.style.color = 'white';

  }

  questionCounter++;
  if (questionCounter === 10) {
    questionCounter = 0;
    $modal.classList.remove('hidden');
    $score.textContent = String(rightAnswer) + '/ 10';
    clearInterval(timerId);

  }

}

function generateRandom(event) {
  submitRandom(0, 19);
  $gameContainer.textContent = '';
}

function submitRandom(min, max) {
  var randomArr = [];
  for (var i = 0; i < 4; i++) {
    randomArr.push(generateSingleRandomNumber(min, max));
  }
  getRandomChar(randomArr);
}

function generateSingleRandomNumber(min, max) {
  return Math.floor(Math.random() * max - min) + min;
}

function renderSearchResults(characters) {

  var $colFourth = document.createElement('div');
  $colFourth.setAttribute('class', 'col-fourth card');

  var $wrapRow = document.createElement('div');
  $wrapRow.setAttribute('class', 'row wrap');
  $colFourth.appendChild($wrapRow);

  var $img = document.createElement('img');
  $img.setAttribute('src', characters.image);
  $img.setAttribute('class', 'results-img card-no-margin col-25 max-height hover');
  $wrapRow.appendChild($img);

  var $name = document.createElement('h2');
  $name.setAttribute('class', 'reem-font card-text col-full center-text flex');
  $name.textContent = characters.name;
  $wrapRow.appendChild($name);

  return $colFourth;
}

function generateRandomNewGame(event) {
  rightAnswer = 0;
  $modal.classList.add('hidden');

  submitRandom(0, 19);
  $gameContainer.textContent = '';
}

function renderRandomGame(chars, index) {
  var $gameContentDiv = document.createElement('div');
  $gameContentDiv.setAttribute('class', 'parent-game-row');

  var $imgRow = document.createElement('div');
  $imgRow.setAttribute('class', 'row');
  $gameContentDiv.appendChild($imgRow);

  var $imgCol = document.createElement('div');
  $imgCol.setAttribute('class', 'column-100 pt-3rem margin-auto-game');
  $imgRow.appendChild($imgCol);

  var $imgCard = document.createElement('div');
  $imgCard.setAttribute('class', 'game-card border-radius');
  $imgCol.appendChild($imgCard);

  var $img = document.createElement('img');
  $img.setAttribute('src', chars[index].image);
  $img.setAttribute('class', 'border-radius lg-game-img');
  $imgCard.appendChild($img);

  var $gameQuestion = document.createElement('h2');
  $gameQuestion.setAttribute('class', 'reem-font center-text game-card-text');
  $gameQuestion.textContent = 'What is the name of this character?!';
  $imgCard.appendChild($gameQuestion);

  var $firstOptionRow = document.createElement('div');
  $firstOptionRow.setAttribute('class', 'row');
  $gameContentDiv.appendChild($firstOptionRow);

  var $firstCol = document.createElement('div');
  $firstCol.setAttribute('class', 'column-100 margin-auto-game');
  $firstOptionRow.appendChild($firstCol);

  var $firstDiv = document.createElement('div');
  $firstDiv.setAttribute('class', 'option-text center-text');
  $firstCol.appendChild($firstDiv);

  var $firstOption = document.createElement('h3');
  $firstOption.setAttribute('class', 'reem-font pd-tb');
  $firstOption.textContent = chars[0].name;
  $firstDiv.appendChild($firstOption);

  var $secondOptionRow = document.createElement('div');
  $secondOptionRow.setAttribute('class', 'row');
  $gameContentDiv.appendChild($secondOptionRow);

  var $secondCol = document.createElement('div');
  $secondCol.setAttribute('class', 'column-100 margin-auto-game');
  $secondOptionRow.appendChild($secondCol);

  var $secondDiv = document.createElement('div');
  $secondDiv.setAttribute('class', 'option-text center-text');
  $secondCol.appendChild($secondDiv);

  var $secondOption = document.createElement('h3');
  $secondOption.setAttribute('class', 'reem-font pd-tb');
  $secondOption.textContent = chars[1].name;
  $secondDiv.appendChild($secondOption);

  var $thirdOptionRow = document.createElement('div');
  $thirdOptionRow.setAttribute('class', 'row');
  $gameContentDiv.appendChild($thirdOptionRow);

  var $thirdCol = document.createElement('div');
  $thirdCol.setAttribute('class', 'column-100 margin-auto-game');
  $thirdOptionRow.appendChild($thirdCol);

  var $thirdDiv = document.createElement('div');
  $thirdDiv.setAttribute('class', 'option-text center-text');
  $thirdCol.appendChild($thirdDiv);

  var $thirdOption = document.createElement('h3');
  $thirdOption.setAttribute('class', 'reem-font pd-tb');
  $thirdOption.textContent = chars[2].name;
  $thirdDiv.appendChild($thirdOption);

  var $fourthOptionRow = document.createElement('div');
  $fourthOptionRow.setAttribute('class', 'row');
  $gameContentDiv.appendChild($fourthOptionRow);

  var $fourthCol = document.createElement('div');
  $fourthCol.setAttribute('class', 'column-100 margin-auto-game');
  $fourthOptionRow.appendChild($fourthCol);

  var $fourthDiv = document.createElement('div');
  $fourthDiv.setAttribute('class', 'option-text center-text');
  $fourthCol.appendChild($fourthDiv);

  var $fourthOption = document.createElement('h3');
  $fourthOption.setAttribute('class', 'reem-font pd-tb');
  $fourthOption.textContent = chars[3].name;
  $fourthDiv.appendChild($fourthOption);

  return $gameContentDiv;
}

function showCharList(event) {
  appendChars();
}

function appendChars() {
  for (var i = 0; i < data.characterData.length; i++) {
    $parentListView.appendChild(renderSearchResults(data.characterData[i]));
  }
}
var currentChar;
function showCharDetails(event) {
  if (event.target.classList.contains('results-img')) {
    for (var i = 0; i < data.characterData.length; i++) {
      if (data.characterData[i].image === event.target.src) {
        currentChar = data.characterData[i];
        hideDetails.classList.remove('hidden');
        hideDetails.appendChild(renderCharCard(data.characterData[i]));
      }

    }

  }

}

function hideCharDetails(event) {
  if (event.target.tagName === 'I') {
    hideDetails.classList.add('hidden');
    while (hideDetails.firstChild) {
      hideDetails.removeChild(hideDetails.firstChild);
    }
  }
}
function clearData(event) {
  var $parentListView = document.querySelector('#list');
  if (data.view !== 'character-list' && event.target.tagName === 'A') {
    data.characterData = [];
    rightAnswer = 0;
    while ($parentListView.childNodes.length > 2) {
      $parentListView.removeChild($parentListView.lastChild);

    }
  }
}
function saveCharEvent(event) {
  if (event.target.classList.contains('save-hover')) {
    data.favorites.push(currentChar);
    var charSavedText = event.target;
    charSavedText.textContent = 'Saved!';
    charSavedText.classList.add('green-text');
  }

}

function renderCharCard(character) {
  var $modalDiv = document.createElement('div');
  $modalDiv.setAttribute('class', 'card-modal');

  var $row = document.createElement('div');
  $row.setAttribute('class', 'flex-on-lg margin-top  width-80 border');
  $modalDiv.appendChild($row);

  var $firstColFull = document.createElement('div');
  $firstColFull.setAttribute('class', 'column-full');
  $row.appendChild($firstColFull);

  var $img = document.createElement('img');
  $img.setAttribute('src', character.image);
  $img.setAttribute('class', 'result-img-card');
  $firstColFull.appendChild($img);

  var icon = document.createElement('i');
  icon.setAttribute('class', 'fas fa-times fa-lg absolute-icon');
  $firstColFull.appendChild(icon);

  var $secColFull = document.createElement('div');
  $secColFull.setAttribute('class', 'column-full');
  $row.appendChild($secColFull);

  var $charName = document.createElement('h1');
  $charName.setAttribute('class', 'reem-font pl bold-font');
  $charName.textContent = character.name;
  $secColFull.appendChild($charName);

  var $charStatus = document.createElement('h2');
  $charStatus.setAttribute('class', 'reem-font pl');
  $charStatus.textContent = 'Status: ';
  $secColFull.appendChild($charStatus);

  var status = document.createElement('span');
  status.textContent = character.status;
  status.setAttribute('class', 'span-text');
  $charStatus.appendChild(status);

  var $charSpecies = document.createElement('h2');
  $charSpecies.setAttribute('class', 'reem-font pl');
  $charSpecies.textContent = 'Species: ';
  $secColFull.appendChild($charSpecies);

  var species = document.createElement('span');
  species.textContent = character.species;
  species.setAttribute('class', 'span-text');
  $charSpecies.appendChild(species);

  var $charGender = document.createElement('h2');
  $charGender.setAttribute('class', 'reem-font pl');
  $charGender.textContent = 'Gender: ';
  $secColFull.appendChild($charGender);

  var gender = document.createElement('span');
  gender.textContent = character.gender;
  gender.setAttribute('class', 'span-text');
  $charGender.appendChild(gender);

  var $charOrigin = document.createElement('h2');
  $charOrigin.setAttribute('class', 'reem-font pl');
  $charOrigin.textContent = 'Origin: ';
  $secColFull.appendChild($charOrigin);

  var origin = document.createElement('span');
  origin.textContent = character.origin.name;
  origin.setAttribute('class', 'span-text');
  $charOrigin.appendChild(origin);

  var $charLocation = document.createElement('h2');
  $charLocation.setAttribute('class', 'reem-font pl');
  $charLocation.textContent = 'Location: ';
  $secColFull.appendChild($charLocation);

  var location = document.createElement('span');
  location.textContent = character.location.name;
  location.setAttribute('class', 'span-text');
  $charLocation.appendChild(location);

  var $saveButton = document.createElement('span');
  $saveButton.setAttribute('class', 'center-text mt-3rem reem-font save-hover margin-auto display-table');
  $saveButton.textContent = 'Save to Favorites?';
  $secColFull.appendChild($saveButton);

  return $modalDiv;

}
