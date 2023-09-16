window.addEventListener('load', 
  function() { 
    renderShortcuts();
});

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

      var faviconimg = document.createElement('img');
      faviconimg.src = "https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=" + shortcut.url + "&size=32";
      var label = document.createElement('a');
      label.innerText = shortcut.label;
      label.href = shortcut.url;

      var deleteButton = document.createElement('button');
      deleteButton.innerHTML = "&#xE107;";
      deleteButton.className = 'delete-button';
      deleteButton.onclick = function () {
        deleteShortcut(index);
      };
      li.appendChild(faviconimg);
      li.appendChild(label);
      li.appendChild(deleteButton);
      container.appendChild(li);
    });
  }
}