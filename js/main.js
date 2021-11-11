
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
  xhr.addEventListener('load', function (name) {
    var matchingCharacters = xhr.response.results;

    var position = document.querySelector('.mb-1rem');
    for (var i = 0; i < matchingCharacters.length; i++) {
      position.appendChild(renderSearchResults(matchingCharacters[i]));
    }
  });
  xhr.send();
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
