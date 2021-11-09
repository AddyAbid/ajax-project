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
}
