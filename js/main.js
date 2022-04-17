/* global data */
/* exported data */
var $imgPreview = document.querySelector('#img-preview');
var $submit = document.querySelector('#entry-form');
var $photoURL = document.querySelector('.photoUrlBox');
var $ul = document.querySelector('#entries-list');
$photoURL.addEventListener('input', photoInput);
$submit.addEventListener('submit', submitFunction);
document.addEventListener('click', handleViewChange);

function photoInput(event) {
  if (event.target.name === 'photoUrl') {
    $imgPreview.setAttribute('src', event.target.value);
  }
}
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
  var $entry = journalEntries(formObjects);
  $ul.prepend($entry);
  showView('entries');
}

function journalEntries(entry) {
  var $li = document.createElement('li');

  var $div1 = document.createElement('div');
  $div1.setAttribute('class', 'row');

  var $div2 = document.createElement('div');
  $div2.setAttribute('class', 'column-full column-half');

  var $img2 = document.createElement('img');
  $img2.setAttribute('class', 'image2');
  $img2.setAttribute('alt', entry.title);
  $img2.setAttribute('src', entry.url);

  var $div3 = document.createElement('div');
  $div3.setAttribute('class', 'column-full column-half');

  var $h3 = document.createElement('h3');
  $h3.textContent = entry.title;

  var $p = document.createElement('p');
  $p.textContent = entry.notes;

  $li.appendChild($div1);
  $div1.appendChild($div2);
  $div2.appendChild($img2);
  $div1.appendChild($div3);
  $div3.appendChild($h3);
  $div3.appendChild($p);

  return $li;
}

document.addEventListener('DOMContentLoaded', function (event) {
  for (var i = 0; i < data.entries.length; i++) {
    var makeEntires = journalEntries(data.entries[i]);
    $ul.appendChild(makeEntires);
  }
});

function showView(view) {
  var views = document.querySelectorAll('div[data-view]');
  for (var i = 0; i < views.length; i++) {
    if (views[i].getAttribute('data-view') === view) {
      views[i].classList.remove('hidden');
    } else {
      views[i].classList.add('hidden');
    }
  }
}

function handleViewChange(event) {
  if (event.target.tagName !== 'A') return;
  var view = event.target.getAttribute('data-view');
  showView(view);
}
