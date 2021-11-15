
var $view = document.querySelectorAll('.view');

document.addEventListener('click', viewHandler);

function swapView(viewName) {
  if (!event.target.matches('.select')) {
    return;
  }
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
document.addEventListener('DOMContentLoaded', renderSearchResults);

function viewHandler(event) {
  if (!event.target.matches('.button')) {
    return;
  }
  swapView(event.target.getAttribute('data-view'));
}

var $input = document.querySelector('#searchData');

$input.addEventListener('submit', submitData);

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
var timerId = null;
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

    var gameOptions = document.querySelector('.parent-game-row');
    gameOptions.appendChild(renderRandomGame(eachChar, randomIndex));
    gameOptions.addEventListener('click', clickAnswer);
    gameOptions.addEventListener('click', renderRandomGame);
    gameOptions.addEventListener('click', getRandomChar);

    function clickAnswer(event) {
      timerId = setTimeout(generateRandom, 1000);
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
      gameOptions.removeEventListener('click', clickAnswer);
      questionCounter++;
      if (questionCounter === 10) {
        questionCounter = 0;
        $modal.classList.remove('hidden');
        $score.textContent = String(rightAnswer) + '/ 10';
        clearInterval(timerId);
      }
    }
  });
  xhr.send();
}

var $gameButtonMobile = document.querySelector('.game-button-mobile');
var $gameButtonDesktop = document.querySelector('.game-button-desktop');

$gameButtonMobile.addEventListener('click', generateRandom);
$gameButtonDesktop.addEventListener('click', generateRandom);

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
  $img.setAttribute('class', 'results-img card-no-margin col-25 max-height');
  $wrapRow.appendChild($img);

  var $name = document.createElement('h2');
  $name.setAttribute('class', 'reem-font card-text col-full center-text flex');
  $name.textContent = characters.name;
  $wrapRow.appendChild($name);

  return $colFourth;
}

var $gameContainer = document.querySelector('.parent-game-row');
var $dashboardButton = document.querySelector('.dash-button');
var $playAgain = document.querySelector('.play-again-button');
var $modal = document.querySelector('.modal');

$dashboardButton.addEventListener('click', modalOptions);
$playAgain.addEventListener('click', generateRandomNewGame);

var rightAnswer = 0;
var questionCounter = 0;

var $score = document.querySelector('.number');

function modalOptions(event) {
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

  // var $hiddenColumn = document.createElement('div');
  // $hiddenColumn.setAttribute('class', 'hidden-column-half');
  // $imgRow.appendChild($hiddenColumn);

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
