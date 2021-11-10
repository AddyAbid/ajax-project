var $searchCharButton = document.querySelector('.select-container');
var $view = document.querySelectorAll('.view');

$searchCharButton.addEventListener('click', swapView);
function swapView(event) {
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
  var currentView = event.target.getAttribute('data-view');
  data.view = currentView;
}

var $input = document.querySelector('#searchData');

$input.addEventListener('submit', submitData);
var characterSearched;
function submitData(event) {
  event.preventDefault();
  characterSearched = {
    searched: $input.input.value
  };
  document.body.style.backgroundColor = 'rgb(167, 167, 167)';
  renderChars();
  $input.reset();
}

function renderChars() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.disneyapi.dev/characters');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var charData = xhr.response;
    for (var data in charData) {
      var dataArray = charData[data];
    }
    var $row = document.querySelector('.mb-1rem');
    for (var i = 0; i < dataArray.length; i++) {
      if (charData.data[i].name.indexOf(characterSearched.searched.toUpperCase()) !== -1 || charData.data[i].name.indexOf(characterSearched.searched.toUpperCase()) !== -1 || charData.data[i].name === characterSearched) {
        $row.appendChild(renderSearchResults(charData.data[i]));
      }
    }
  }
  );
  xhr.send();
}

/* <div class="results" data-view="results">
  <div class="row  mb-1rem flex-wrap">
    <div class="col-fourth card">
      <div class="row wrap">
        <img src="images/abu.jpeg" class="results-img card-no-margin col-25 max-height">
        <h2 class ="font-black card-text col-full center-text flex">Abu</h2>
      </div>
    </div> */

function renderSearchResults(characters) {

  var $colFourth = document.createElement('div');
  $colFourth.setAttribute('class', 'col-fourth card');

  var $wrapRow = document.createElement('div');
  $wrapRow.setAttribute('class', 'row wrap');
  $colFourth.appendChild($wrapRow);

  var $img = document.createElement('img');
  $img.setAttribute('src', characters.imageUrl);
  $img.setAttribute('class', 'results-img card-no-margin col-25 max-height');
  $wrapRow.appendChild($img);

  var $name = document.createElement('h2');
  $name.setAttribute('class', 'font-black card-text col-full center-text flex');
  $name.textContent = characters.name;
  $wrapRow.appendChild($name);

  return $colFourth;
}
