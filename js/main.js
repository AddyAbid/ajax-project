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

function submitData(event) {
  event.preventDefault();
  var characterSearched = {
    searched: $input.input.value
  };
  $input.reset();
}

function renderChars() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.disneyapi.dev/characters');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    console.log(xhr.status);
    console.log(xhr.response);
    var charData = xhr.response;
    for (var key in charData) {
      var charArray = charData[key];
      console.log(charArray);
      for (var i = 0; i < charArray.length; i++) {
        if (charArray[i].films && charArray[i].films.length !== 0) {
          console.log(charArray[i]);
        }

      }
    }
  });
  xhr.send();
}
renderChars();

/* <div class="results" data-view="results">
  <div class="row  mb-1rem flex-wrap">
    <div class="col-fourth card">
      <div class="row wrap">
        <img src="images/abu.jpeg" class="results-img card-no-margin col-25 max-height">
        <h2 class ="font-black card-text col-full center-text flex">Abu</h2>
      </div>
    </div> */

function renderSearchResults(characters) {
  var $row = document.createElement('div');
  $row.setAttribute('class', 'row mb-1rem flex-wrap');

  var $colFourth = document.createElement('div');
  $colFourth.setAttribute('class', 'col-fourth card');
  $row.appendChild($colFourth);

  var $wrapRow = document.createElement('div');
  $wrapRow.setAttribute('class', 'row wrap');
  $colFourth.appendChild($wrapRow);

  var $img = document.createElement('img');
  $img.setAttribute('src', characters.src);
  $wrapRow.appendChild($img);

  var $name = document.createElement('h2');
  $name.setAttribute('class', 'results-img card-no-margin col-25 max-height');
  $name.textContent = characters.name;
  $wrapRow.appendChild($name);

  return $row;
}

var $row = document.querySelector('.results');
