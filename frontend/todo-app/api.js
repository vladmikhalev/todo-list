export async function getTodoList(owner) {
  const response = await fetch(`http://localhost:3000/api/todos?owner=${owner}`);
  return await response.json();
}


export async function createTodoItem({ owner, nameItem }) {
  const response = await fetch('http://localhost:3000/api/todos', {
    method: 'POST',
    body: JSON.stringify({
      name: nameItem,
      owner: owner,
    }),
    headers: {
      'Content-Type': 'application/json',
    }
  });
  // return console.log(await response.json());
  return await response.json();

}


export async function switchTodoItemDone(todoItem) {

  todoItem.done = !todoItem.done;
  fetch(`http://localhost:3000/api/todos/${todoItem.id}`, {
    method: 'PATCH',
    body: JSON.stringify({ done: todoItem.done }),
    header: {
      'Content-Type': 'application/json',
    }
  });
}



export async function deleteTodoItem({ element, todoItem }) {
  
  if (confirm('Вы уверены?')) {
    element.remove();
    fetch(`http://localhost:3000/api/todos/${todoItem.id}`, {
      method: 'DELETE',
    });
    return
  }
}

