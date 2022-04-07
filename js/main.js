/* global data */
/* exported data */
function photoInput(event) {
  if (event.target.name === 'photoUrl') {
    $imgPreview.setAttribute('src', event.target.value);
  }
}
var $photoURL = document.querySelector('.photoUrlBox');
$photoURL.addEventListener('input', photoInput);

var $imgPreview = document.querySelector('#img-preview');

var $submit = document.querySelector('#entry-form');
function submitFunction(event) {
  event.preventDefault();
  var title = $submit.elements.title.value;
  var photoUrl = $submit.elements.photoUrl.value;
  var notes = $submit.elements.notes.value;
  var formObjects = {
    title: title,
    url: photoUrl,
    notes: notes,
    id: data.nextEntryId
  };
  data.nextEntryId++;
  data.entries.unshift(formObjects);
  $submit.reset();
  $imgPreview.setAttribute('src', 'images/placeholder-image-square.jpg');
}

$submit.addEventListener('submit', submitFunction);
