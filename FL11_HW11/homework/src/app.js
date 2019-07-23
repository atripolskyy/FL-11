let listCount = 0;
const addToList = document.getElementById('addToList'),
      receiver = document.getElementById('receiver'),
      maxList = 10,
      errorEl = document.getElementById('error');

function addItem() {
  let li = document.createElement('li');
      li.setAttribute('draggable', true);

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

/*
drag and drop functions
*/
var dragSrcEl = null;

function handleDragStart(e) {
  // Target (this) element is the source node.
  dragSrcEl = this;

  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.outerHTML);

  this.classList.add('dragElem');
}
function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault(); // Necessary. Allows us to drop.
  }
  this.classList.add('over');

  e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

  return false;
}

function handleDragEnter(e) {
  // this / e.target is the current hover target.
}

function handleDragLeave(e) {
  this.classList.remove('over');  // this / e.target is previous target element.
}

function handleDrop(e) {
  // this/e.target is current target element.

  if (e.stopPropagation) {
    e.stopPropagation(); // Stops some browsers from redirecting.
  }

  // Don't do anything if dropping the same column we're dragging.
  if (dragSrcEl != this) {
    // Set the source column's HTML to the HTML of the column we dropped on.
    //alert(this.outerHTML);
    //dragSrcEl.innerHTML = this.innerHTML;
    //this.innerHTML = e.dataTransfer.getData('text/html');
    this.parentNode.removeChild(dragSrcEl);
    var dropHTML = e.dataTransfer.getData('text/html');
    this.insertAdjacentHTML('beforebegin',dropHTML);
    var dropElem = this.previousSibling;
    addDnDHandlers(dropElem);
    
  }
  this.classList.remove('over');
  return false;
}

function handleDragEnd(e) {
  // this/e.target is the source node.
  this.classList.remove('over');

  /*[].forEach.call(cols, function (col) {
    col.classList.remove('over');
  });*/
}

function addDnDHandlers(elem) {
  elem.addEventListener('dragstart', handleDragStart, false);
  elem.addEventListener('dragenter', handleDragEnter, false)
  elem.addEventListener('dragover', handleDragOver, false);
  elem.addEventListener('dragleave', handleDragLeave, false);
  elem.addEventListener('drop', handleDrop, false);
  elem.addEventListener('dragend', handleDragEnd, false);

}

/*
var cols = document.querySelectorAll('.list li');
[].forEach.call(cols, addDnDHandlers);*/