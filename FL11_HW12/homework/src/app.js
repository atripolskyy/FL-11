/*const rootNode = document.getElementById('root');

const todoItems = [
    {isDone: false, id: 12345, description: 'Todo 1'}
];*/

// Your code goes here

//rootNode.appendChild(/* Append your list item node*/);
const toDoApp = () => {
  const rootNode = document.getElementById('root');
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  function mainPage() {
    rootNode.innerHTML = `<h1>Simple TODO application</h1>
      <button type="button" class="_add-task">Add new task</button>
      <p>TODO is empty</p>`;

    rootNode.querySelector('._add-task').addEventListener('click', () => {
      location.hash = '/add';
    });

    if (tasks.length !== 0) {
      showTasks();
    }
  }

  function showTasks() {
    //console.log(tasks);
    let error = false;
    if (rootNode.querySelector('.tasks')) {
      rootNode.querySelector('.tasks').remove();
    }
    const ul = document.createElement('ul');
          ul.classList.add('tasks');
          ul.innerHTML = tasks.map(task => {
            return `<li id="${task.item_id}"${task.done ? ' class="done"' : ''}>
              <input type="checkbox" name="mark" class="_mark-task"${task.done ? ' checked="checked"' : ''}>
              <span>${task.text}</span>
              <button type="button" class="_del-task"${task.done ? ' disabled="disabled"' : ''}>Del</button>
            </li>`;
    }).join('');

    if (rootNode.querySelector('p')) {
      rootNode.querySelector('p').remove();
    }
    rootNode.appendChild(ul);

    ul.querySelectorAll('li').forEach(item => {
      item.querySelector('._del-task').addEventListener('click', delTask);
      item.querySelector('._mark-task').addEventListener('change', markTask);
      item.querySelector('span').addEventListener('click', e => {
        const itemId = e.target.parentNode.id;

        tasks.forEach(item => {
          if (item.item_id === +itemId && item.done === true) {
            alert('Error! You can\'t edit already done item');
            error = true;
          }
        });

        if (!error) {
          location.hash = `/modify/:${itemId}`;
        }
      });
    });
  }

  function addItemPage() {
    rootNode.innerHTML = `<h1>Add task</h1>
    <form action="#">
      <input type="text" name="task-name" class="task-name" required>
      <div class="row">
        <button type="button" class="_cancel-task">Cancel</button>
        <button type="submit" class="_save-task">Save changes</button>
      </div>
      </form>`;

    rootNode.querySelector('form').addEventListener('submit', addTask);
    rootNode.querySelector('._cancel-task').addEventListener('click', () => {
      location.hash = '';
    });
  }

  function addTask(e) {
    e.preventDefault();

    const text = rootNode.querySelector('.task-name').value;
    let error = false;

    let lastIndex = 0;

    tasks.forEach(item => {
      if (item.item_id >= lastIndex) {
        lastIndex = item.item_id + 1;
      }

      if (item.text === text) {
        alert('Error! You can\'t add already exist item');
        error = true;
      }
    });

    const task = {
      item_id: lastIndex,
      text,
      done: false
    }

    if (!error) {
      tasks.unshift(task);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      location.hash = '';
    }
  }

  function delTask() {
    const taskId = +this.parentNode.id;

    tasks.forEach((task, i) => {
      if (task.item_id === taskId) {
        tasks.splice(i, 1);
      }
    });

    if (tasks.length === 0) {
      const p = document.createElement('p');
            p.innerText = 'TODO is empty';
            rootNode.appendChild(p);
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
    this.parentNode.remove();
  }

  function markTask() {
    const parentNode = this.parentNode;
    const taskId = +this.parentNode.id;

    tasks.forEach((task, i) => {
      if (task.item_id === taskId) {
        if (this.checked) {
          tasks[i].done = true;
          parentNode.classList.add('done');
          parentNode.querySelector('._del-task').setAttribute('disabled', 'disabled');
          tasks.push(tasks[i]);
          tasks.splice(i, 1);

          showTasks();
        } else {
          tasks[i].done = false;
          const itemCurrent = tasks[i];

          const items = rootNode.querySelector('.tasks').children;
          const itemDone = rootNode.querySelector('.tasks .done');
          const itemDoneIndex = Array.prototype.indexOf.call(items, itemDone);

          parentNode.classList.remove('done');
          parentNode.querySelector('._del-task').removeAttribute('disabled');

          tasks.splice(i, 1);
          let doneItems = tasks.splice(itemDoneIndex);

          tasks.push(itemCurrent);

          for (let i = 0; i < doneItems.length; i++) {
            tasks.push(doneItems[i]);
          }

          showTasks();
        }
      }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function editPage(taskId) {
    let taskIndex;
    let error = false;
    let task = {};

    tasks.forEach((item, i) => {
      if (item.item_id === +taskId) {
        taskIndex = i;
        task = item;
      }
    });

    rootNode.innerHTML = `<h1>Modify task</h1>
    <form action="#">
      <input type="text" name="task-name" value="${task.text}" class="task-name" required>
      <div class="row">
        <button type="button" class="_cancel-task">Cancel</button>
        <button type="submit" class="_save-task">Save changes</button>
      </div>
    </form>`;

    rootNode.querySelector('form').addEventListener('submit', e => {
      e.preventDefault();
      const taskText = rootNode.querySelector('.task-name').value;
      tasks.forEach(item => {
        if (item.item_id !== +taskId && item.text === taskText) {
          alert('Error! You can\'t add already exist item');
          error = true;
        }
      });
      
      if (!error) {
        tasks[taskIndex].text = taskText;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        location.hash = '';
      }
    });
    rootNode.querySelector('._cancel-task').addEventListener('click', () => {
      location.hash = '';
    });
  }

  //localStorage.clear();

  function locationHashChanged() {
    const regHash = /^#\/(modify)\/:\d$/.test(location.hash);

    if (location.hash === '#/add') {
      addItemPage();
    }

    if (regHash) {
      const taskId = /\d$/.exec(location.hash)[0];
      editPage(taskId);
    }

    if (location.hash === '') {
      mainPage();
    }
  }

  mainPage();

  window.addEventListener('hashchange', locationHashChanged);
}

document.addEventListener('DOMContentLoaded', toDoApp);