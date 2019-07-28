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
    let error = false;
    if (rootNode.querySelector('.tasks')) {
      rootNode.querySelector('.tasks').remove();
    }
    const ul = document.createElement('ul');
          ul.classList.add('tasks');
          ul.innerHTML = tasks.map(task => {
            return `<li id="${task.id}"${task.isDone ? ' class="done"' : ''}>
              <input type="checkbox" name="mark" class="_mark-task"${task.isDone ? ' checked="checked"' : ''}>
              <span>${task.description}</span>
              <button type="button" class="_del-task"${task.isDone ? ' disabled="disabled"' : ''}>Delete</button>
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
          if (item.id === +itemId && item.isDone === true) {

            showAlert('Error! You can\'t edit already done item');

            error = true;
          }
        });

        if (!error) {
          location.hash = `/modify/:${itemId}`;
        }
      });
    });
  }

  function showAlert(text) {
    const timeOut = 2000;
    const timeOutSecond = 1000;

    const alertPopup = document.createElement('div');
          alertPopup.classList.add('alert');
          alertPopup.innerHTML = `<p>${text}</p>`;

    rootNode.appendChild(alertPopup);

    if (!/OPR/.test(navigator.userAgent) && !/Edge/.test(navigator.userAgent)) {
      alertPopup.setAttribute('style', 'left: 20px; right: auto;');
    }

    setTimeout(function(){
      rootNode.querySelector('.alert').style.opacity = 0;
      setTimeout(function(){
        rootNode.querySelector('.alert').remove();
      }, timeOutSecond);
    }, timeOut);
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

    const description = rootNode.querySelector('.task-name').value;
    let error = false;

    let lastIndex = 0;

    tasks.forEach(item => {
      if (item.id >= lastIndex) {
        lastIndex = item.id + 1;
      }

      if (item.description === description) {
        showAlert('Error! You can\'t add already exist item');
        error = true;
      }
    });

    const task = {
      id: lastIndex,
      description,
      isDone: false
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
      if (task.id === taskId) {
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
      if (task.id === taskId) {
        if (this.checked) {
          tasks[i].isDone = true;
          parentNode.classList.add('done');
          parentNode.querySelector('._del-task').setAttribute('disabled', 'disabled');
          tasks.push(tasks[i]);
          tasks.splice(i, 1);

          showTasks();
        } else {
          tasks[i].isDone = false;
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
      if (item.id === +taskId) {
        taskIndex = i;
        task = item;
      }
    });

    rootNode.innerHTML = `<h1>Modify task</h1>
    <form action="#">
      <input type="text" name="task-name" value="${task.description}" class="task-name" required>
      <div class="row">
        <button type="button" class="_cancel-task">Cancel</button>
        <button type="submit" class="_save-task">Save changes</button>
      </div>
    </form>`;

    rootNode.querySelector('form').addEventListener('submit', e => {
      e.preventDefault();
      const taskText = rootNode.querySelector('.task-name').value;
      tasks.forEach(item => {
        if (item.id !== +taskId && item.description === taskText) {
          showAlert('Error! You can\'t add already exist item');
          error = true;
        }
      });

      if (!error) {
        tasks[taskIndex].description = taskText;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        location.hash = '';
      }
    });
    rootNode.querySelector('._cancel-task').addEventListener('click', () => {
      location.hash = '';
    });
  }

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