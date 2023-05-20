// Получить все дела
export function getTodoList(owner) {

  if (localStorage.getItem(owner) !== null) {
    return JSON.parse(localStorage.getItem(owner));
  } else {
    return [];
  }
}


// Добавить дело
export function createTodoItem({ owner, nameItem }) {
  console.log(owner)
  console.log(nameItem)
  let localArr;
  if (localStorage.getItem(owner) !== null || undefined) {
    localArr = JSON.parse(localStorage.getItem(owner));
  } else {
    localArr = [];
  }
  let newObj = { name: nameItem, done: false, id: getNewID(localArr) };
  localArr.push(newObj);

  localStorage.setItem(owner, JSON.stringify(localArr));


  return newObj
}


// Изменить дело
export function switchTodoItemDone(todoItem, owner) {
  console.log(owner)
  todoItem.done = !todoItem.done;

  let localArr = JSON.parse(localStorage.getItem(owner));


  console.log(localArr)
  for (const obj of localArr) {
    if (obj.id === todoItem.id) {
      obj.done = todoItem.done;
    }
  }

  localStorage.setItem(owner, JSON.stringify(localArr));
}

// Удалить дело
export function deleteTodoItem({ element, todoItem, owner }) {
  console.log('delete')
  if (confirm('Вы уверены?')) {
    element.remove();

    let localArr = JSON.parse(localStorage.getItem(owner));

    let newArr = localArr.filter(e => e.id !== todoItem.id);
    localStorage.setItem(owner, JSON.stringify(newArr));
  }

}





function getNewID(arr) {
  let max = 0;
  for (const item of arr) {
    if (item.id > max) {
      max = item.id
    }
  }
  return max + 1;
}
