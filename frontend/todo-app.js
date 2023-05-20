
function createAppTitle(title) {
  let appTitle = document.createElement('h2');
  appTitle.innerHTML = title;
  return appTitle;
}

function createTodoItemForm() {
  let form = document.createElement('form');
  let input = document.createElement('input');
  let buttonWrapper = document.createElement('div');
  let button = document.createElement('button');

  form.classList.add('input-group', 'mb-3');
  input.classList.add('form-control');
  input.placeholder = 'Введите название нового дела';
  buttonWrapper.classList.add('input-group-append');
  button.classList.add('btn', 'btn-primary');
  button.textContent = 'Добавить дело';



  button.disabled = true;

  input.addEventListener('input', function () {
    if (input.value.length > 0) {
      button.disabled = false;
      button.disabled = input.value.length == 0;
    }
    else {
      button.disabled = true;
    }
  });






  buttonWrapper.append(button);
  form.append(input);
  form.append(buttonWrapper);

  return {
    form,
    input,
    button,
  };
}

function createTodoList() {
  let list = document.createElement('ul');
  list.classList.add('list-group');
  return list;
}

function createTodoItemElement(todoItem, { onDone, onDelete }) {
  const doneClass = 'list-group-item-success';
  let item = document.createElement('li');
  let buttonGroup = document.createElement('div');
  let doneButton = document.createElement('button');
  let deleteButton = document.createElement('button');

  item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
  if (todoItem.done) {
    item.classList.add(doneClass);
  }
  item.textContent = todoItem.name;

  buttonGroup.classList.add('btn-group-sm', 'btn-group');
  doneButton.classList.add('btn', 'btn-success');
  doneButton.textContent = 'Готово';
  deleteButton.classList.add('btn', 'btn-danger');
  deleteButton.textContent = 'Удалить';

  doneButton.addEventListener('click', function () {
    onDone({todoItem, element: item });
    item.classList.toggle(doneClass, todoItem.done);
  });

  deleteButton.addEventListener('click', function () {
    onDelete({todoItem, element: item });

  });

  buttonGroup.append(doneButton);
  buttonGroup.append(deleteButton);
  item.append(buttonGroup);

  return item;
}



async function createTodoApp(container, title, owner) {
  let todoAppTitle = createAppTitle(title);
  let todoItemForm = createTodoItemForm();
  let todoList = createTodoList();
  const hendlers = {
    onDone({todoItem}) {
      todoItem.done = !todoItem.done;
      fetch(`http://localhost:3000/api/todos/${todoItem.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ done: todoItem.done }),
        header: {
          'Content-Type': 'application/json',
        }
      });
    },
    onDelete({ todoItem, element }) {
      console.log(element)
      if (confirm('Вы уверены?')) {
        element.remove();
        fetch(`http://localhost:3000/api/todos/${todoItem.id}`, {
          method: 'DELETE',
        });
        return
      }
    }
  };

  container.append(todoAppTitle);
  container.append(todoItemForm.form);
  container.append(todoList);


  const response = await fetch(`http://localhost:3000/api/todos?owner=${owner}`);
  const todoItemList = await response.json();

  todoItemList.forEach(todoItem => {
    const todoItemElement = createTodoItemElement(todoItem, hendlers);
    todoList.append(todoItemElement);
  });


  todoItemForm.form.addEventListener('submit', async function (event) {
    event.preventDefault();

    if (!todoItemForm.input.value) {
      return;
    }

    const response = await fetch('http://localhost:3000/api/todos', {
      method: 'POST',
      body: JSON.stringify({
        name: todoItemForm.input.value.trim(),
        owner,
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    });


    const todoItem = await response.json();
    console.log(todoItem)


    let todoItemElement = createTodoItemElement(todoItem, hendlers);




    todoList.append(todoItemElement);

    todoItemForm.input.value = '';
    todoItemForm.button.disabled = true;


  });

};
export { createTodoApp };
