/* global data */
/* exported data */
var $imgPreview = document.querySelector('#img-preview');
var $submit = document.querySelector('#entry-form');
var $photoURL = document.querySelector('.photoUrlBox');
var $ul = document.querySelector('#entries-list');
var $formTitle = document.querySelector('#form-title');
$photoURL.addEventListener('input', photoInput);
$submit.addEventListener('submit', submitFunction);
$ul.addEventListener('click', handleEditClick);
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
    notes: notes
  };
  if (data.editing === null) {
    formObjects.id = data.nextEntryId;
    data.nextEntryId++;
    data.entries.unshift(formObjects);
    var $entry = journalEntries(formObjects);
    $ul.prepend($entry);
  } else {
    formObjects.id = data.editing.id;
    clearElement($ul);
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].id === formObjects.id) {
        data.entries[i] = formObjects;
      }
      var entry = journalEntries(data.entries[i]);
      $ul.appendChild(entry);
    }
    data.editing = null;
  }
  $submit.reset();
  $imgPreview.setAttribute('src', 'images/placeholder-image-square.jpg');
  showView('entries');
}

function journalEntries(entry) {
  var $li = document.createElement('li');
  $li.setAttribute('data-li-id', entry.id);

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

  var $iconDiv = document.createElement('div');
  $iconDiv.setAttribute('class', 'edit-display');

  var $icon = document.createElement('i');
  $icon.setAttribute('class', 'fas fa-pen space');

  $li.appendChild($div1);
  $div1.appendChild($div2);
  $div2.appendChild($img2);
  $div1.appendChild($div3);
  $div3.appendChild($iconDiv);
  $iconDiv.appendChild($h3);
  $iconDiv.appendChild($icon);
  $div3.appendChild($p);

  return $li;
}

document.addEventListener('DOMContentLoaded', function (event) {
  showView(data.view);
  for (var i = 0; i < data.entries.length; i++) {
    var makeEntires = journalEntries(data.entries[i]);
    $ul.appendChild(makeEntires);
  }
});

function showView(view) {
  data.view = view;
  if (view === 'entries') {
    data.editing = null;
    $submit.reset();
    $imgPreview.setAttribute('src', 'images/placeholder-image-square.jpg');
  } else if (view === 'entry-form') {
    if (data.editing === null) {
      $formTitle.textContent = 'New Entry';
    } else {
      $formTitle.textContent = 'Edit Entry';
    }
  }
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

function handleEditClick(event) {
  if (event.target.tagName !== 'I') return;
  var $li = event.target.closest('li');
  var id = parseInt($li.getAttribute('data-li-id'));
  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i].id === id) {
      data.editing = data.entries[i];
      break;
    }
  }
  $submit.title.value = data.editing.title;
  $submit.photoUrl.value = data.editing.url;
  $submit.notes.value = data.editing.notes;
  $imgPreview.setAttribute('src', data.editing.url);
  showView('entry-form');
}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}
