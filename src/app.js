import { TodoList, Todo } from "./classes";
import { createTodoElement } from "./js/utils";
import "./styles.css";


(() => {
  const divTodoList = document.querySelector('.todo-list');
  const inputNewTodo = document.querySelector('input.new-todo');
  const buttonClearCompleted = document.querySelector('button.clear-completed');
  const ulFilters = document.querySelector('ul.filters');
  const aFilters = document.querySelectorAll('a.filter');
  const todoCount = document.querySelector('#count');
  
  const todoList = new TodoList();
  
  const buildTodos = () => {
    todoList.todos.forEach((todo) => {
      divTodoList.append(createTodoElement(todo));
    });
  }

  const updateCount = () => {
    todoCount.innerHTML = todoList.todos.length;
  }
  
  inputNewTodo.addEventListener('keyup', (event) => {
    if (event.keyCode === 13 && event.target.value) {

      const todo = new Todo(event.target.value);
      const todoElement = createTodoElement(todo);

      if (todoList.selectedFilter === 'completed') {
        todoElement.classList.add('hidden');
      }

      todoList.newTodo(todo);
      divTodoList.append(todoElement);
      updateCount();
      inputNewTodo.value = '';
    }
  });
  
  divTodoList.addEventListener('click', (event) => {
    const targetName = event.target.name || event.target.localName || '';
    const todoElement = event.target.parentElement.parentElement;
    const todoId = todoElement.getAttribute('data-id');
  
    if (!targetName) { return }
  
    if (targetName === 'toggle') {
      todoList.toggleTodo(todoId);
      todoElement.classList.toggle('completed');

      const completed = todoElement.classList.contains('completed');

      if (todoList.selectedFilter === 'pending' && completed) {
        todoElement.classList.add('hidden');
      }

      if (todoList.selectedFilter === 'completed' && !completed) {
        todoElement.classList.add('hidden');
      }
  
      return;
    }
  
    if (targetName === 'delete') {
      todoList.deleteTodo(todoId);
      divTodoList.removeChild(todoElement);
      updateCount();
      return;
    }
  });
  
  buttonClearCompleted.addEventListener('click', () => {
    const deletedTodos = [];

    todoList.clearCompletedTodos();
    
    for (const todoElement of divTodoList.children) {
      if (todoElement.classList.contains('completed')) {
        deletedTodos.push(todoElement);
      }
    }

    deletedTodos.forEach((deletedTodo) => {
      divTodoList.removeChild(deletedTodo);
    });

    updateCount();
  });

  ulFilters.addEventListener('click', (event) => {
    const filter = event.target.getAttribute('filter-data');

    if (!filter) { return }

    aFilters.forEach((filter) => filter.classList.remove('selected'));

    event.target.classList.add('selected');

    todoList.setSelectedFilter(filter);
    
    for (const todoElement of divTodoList.children) {
      todoElement.classList.remove('hidden');

      const completed = todoElement.classList.contains('completed');

      if (filter === 'pending' && completed) {
        todoElement.classList.add('hidden');
      }

      if (filter === 'completed' && !completed) {
        todoElement.classList.add('hidden');
      }
    }
  });
  
  buildTodos();
  updateCount();

})();
