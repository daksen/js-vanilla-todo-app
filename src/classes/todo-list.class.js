import { Todo } from "./todo.class";

export class TodoList {
  constructor() {
    this.selectedFilter = 'all';
    this.getLocalStorage();
  }

  newTodo(todo) {
    this.todos.push(todo);
    this.updateLocalStorage();
  }

  deleteTodo(id) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    this.updateLocalStorage();
  }

  toggleTodo(id) {
    for (const todo of this.todos) {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
    }
    this.updateLocalStorage();
  }

  clearCompletedTodos() {
    this.todos = this.todos.filter((todo) => !todo.completed);
    this.updateLocalStorage();
  }

  setSelectedFilter(filter) {
    this.selectedFilter = filter;
  }

  updateLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  getLocalStorage() {
    const storageTodos = localStorage.key('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
    this.todos = storageTodos.map((todo) => Todo.fromJson(todo));
  }
}