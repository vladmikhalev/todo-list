import { createTodoApp } from './view.js';
import { changeStorage } from './changingStorage.js'

let local = await import('./localStorage.js');
let server = await import('./api.js');

async function setOwner(owner, title) {
  if (localStorage.getItem('paramBtn') == null) {
    localStorage.setItem('paramBtn', 'false')
  }


  changeStorage(switchBtnText)



  if (localStorage.getItem('paramBtn') !== 'true') {
    const todoItemList = local.getTodoList(owner);
    createTodoApp(document.getElementById('todo-app'), {
      title: title,
      owner,
      todoItemList,
      onCreateFormSubmit: local.createTodoItem,
      onDoneClick: local.switchTodoItemDone,
      onDeleteClick: local.deleteTodoItem,

    });
  } else {
    const todoItemList = await server.getTodoList(owner);
    console.log(todoItemList)
    createTodoApp(document.getElementById('todo-app'), {
      title: title,
      owner,
      todoItemList,
      onCreateFormSubmit: server.createTodoItem,
      onDoneClick: server.switchTodoItemDone,
      onDeleteClick: server.deleteTodoItem,

    });
  }


  async function switchBtnText(btn) {

    if (localStorage.getItem('paramBtn') === 'true') {
      console.log(btn)
      btn.textContent = 'Перейти на серверное хранилище';
      localStorage.setItem('paramBtn', false)
      console.log(localStorage)
      window.location.reload();
    } else {
      console.log(btn)
      btn.textContent = 'Перейти на локальное хранилище';
      localStorage.setItem('paramBtn', true)
      console.log(localStorage)
      window.location.reload();
    }
  }
}

export { setOwner };



