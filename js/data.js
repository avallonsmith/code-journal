/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var entriesJSON = localStorage.getItem('javascript-local-storage');
if (entriesJSON !== null) {
  data = JSON.parse(entriesJSON);
}
function stringy(event) {
  var dataArray = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', dataArray);
}
window.addEventListener('beforeunload', stringy);
