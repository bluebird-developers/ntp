function openDialog() {
  document.getElementById('dialogContainer').style.display = 'block';
}

function closeDialog() {
  document.getElementById('dialogContainer').style.display = 'none';
}

function addShortcut() {
  var label = document.getElementById('label').value;
  var url = document.getElementById('url').value;

  if (label && url) {
    var shortcut = { label: label, url: url };

    var shortcuts = localStorage.getItem('shortcuts');
    if (!shortcuts) {
      shortcuts = [];
    } else {
      shortcuts = JSON.parse(shortcuts);
    }

    if (shortcuts.length > 4) {
      shortcuts.shift();
      alert("Error: You cannot add more than 5 shortcuts")
    }
    else {
      shortcuts.push(shortcut);
      localStorage.setItem('shortcuts', JSON.stringify(shortcuts));
      renderShortcuts();
    }
    closeDialog();
    document.getElementById('label').value = '';
    document.getElementById('url').value = '';
  }
}

function deleteShortcut(index) {
  var shortcuts = localStorage.getItem('shortcuts');
  if (shortcuts) {
    shortcuts = JSON.parse(shortcuts);
    shortcuts.splice(index, 1);
    localStorage.setItem('shortcuts', JSON.stringify(shortcuts));
    renderShortcuts();
  }
}

function renderShortcuts() {
  var shortcuts = localStorage.getItem('shortcuts');
  if (shortcuts) {
    shortcuts = JSON.parse(shortcuts);
    var container = document.getElementById('shortcuts-container');
    container.innerHTML = '';

    shortcuts.forEach(function (shortcut, index) {
      var li = document.createElement('li');
      li.className = 'shortcut';

      var a = document.createElement('a');
      a.innerText = shortcut.label;
      a.href = shortcut.url;

      var deleteButton = document.createElement('button');
      var deleteButtonIcon = document.createElement('img');
      deleteButton.className = 'delete-button';
      deleteButton.onclick = function () {
        deleteShortcut(index);
      };
      deleteButtonIcon.className = 'delete-button-icon';
      li.appendChild(a);
      deleteButton.appendChild(deleteButtonIcon);
      li.appendChild(deleteButton);
      container.appendChild(li);
    });
  }
}

renderShortcuts();