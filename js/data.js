/* exported data */
var data = {
  view: 'dashboard'
};
var previousSearchJSON = localStorage.getItem('search-page');
if (previousSearchJSON !== null) {
  data = JSON.parse(previousSearchJSON);
}

window.addEventListener('beforeunload', updateStorage);

function updateStorage(event) {
  var searchJSON = JSON.stringify(data);
  localStorage.setItem('search-page', searchJSON);
}
