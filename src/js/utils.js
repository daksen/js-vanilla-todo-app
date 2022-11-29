

export const createTodoElement = (todo) => {
  const li = document.createElement('li');

  li.setAttribute('data-id', todo.id);
  
  if (todo.completed) {
    li.classList.add('completed');
  }

  li.innerHTML = [
    `<div class="view">`,
      `<input class="toggle" name="toggle" type="checkbox" ${todo.completed ? "checked" : ""}>`,
      `<label>${todo.description}</label>`,
      `<button name="delete" class="destroy"></button>`,
    `</div>`,
  ].join('');

  return li;
}
