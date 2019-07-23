let listCount = 0;
const addToList = document.getElementById('addToList'),
      receiver = document.getElementById('receiver'),
      maxList = 10,
      errorEl = document.getElementById('error');

function addItem() {
  let li = document.createElement('li');

  if (receiver.value === '') {
    errorEl.innerText = 'Введите название задачи';
  } else {
    errorEl.innerText = '';

    li.innerHTML = `<input type="checkbox" name="mark" class="_markCheck"> 
    <div class="text">${receiver.value}</div>
     <button class="_editButton" type="button">edit</button> 
     <button class="_delButton" type="button">del</button>`;

    li.querySelector('._editButton').addEventListener('click', editText);
    li.querySelector('._delButton').addEventListener('click', delNode);
    li.querySelector('._markCheck').addEventListener('change', markTask);

    const list = document.getElementById('list');
          list.appendChild(li);

    receiver.value = '';
    listCount++;
    addToList.setAttribute('disabled', 'disabled');

    if (listCount === maxList) {
      receiver.setAttribute('disabled', 'disabled');
      errorEl.innerText = 'Maximum item per list are created';
    }
  }
}

function editText() {
  const parentEl = this.parentNode;
  let textNode = parentEl.querySelector('.text');
      textNode.setAttribute('contenteditable', true);
      textNode.focus();

      parentEl.querySelector('._editButton').classList.add('hide');
      parentEl.querySelector('._delButton').classList.add('hide');
      parentEl.querySelector('._markCheck').classList.add('hide');

  let saveButton = document.createElement('button');
      saveButton.setAttribute('type', 'button');
      saveButton.classList.add('_saveButton');
      saveButton.innerText = 'save';

      parentEl.insertBefore(saveButton, parentEl.querySelector('._editButton'));
      parentEl.querySelector('._saveButton').addEventListener('click', saveText);
}

function saveText() {
  const parentEl = this.parentNode;
        parentEl.querySelector('._editButton').classList.remove('hide');
        parentEl.querySelector('._delButton').classList.remove('hide');
        parentEl.querySelector('._markCheck').classList.remove('hide');

  this.removeEventListener('click', saveText);
  this.remove();
}

function markTask() {
  const parentNode = this.parentNode;
  if (this.checked) {
    this.setAttribute('disabled', 'disabled');
    parentNode.classList.add('marked');
  }
}

function delNode() {
  this.removeEventListener('click', delNode, false);

  const parentNode = this.parentNode;
        parentNode.remove();

  listCount--;

  if (listCount < maxList) {
    receiver.removeAttribute('disabled');
    errorEl.innerText = '';
  }

  if (receiver.value !== '') {
    addToList.removeAttribute('disabled');
  }
}

addToList.addEventListener('click', addItem);

receiver.addEventListener('input', (e) => {
  if (e.target.value !== '') {
    if (listCount < maxList) {
      addToList.removeAttribute('disabled');
    }
  }
});