import { v4 as uuidv4 } from 'uuid';

export class Todo {

  static fromJson({ id, description, completed, created }) {
    const todo = new Todo(description);
    todo.id = id;
    todo.completed = completed;
    todo.created = created;
    return todo;
  }

  constructor(description) {
    this.id = uuidv4();
    this.description = description;
    this.completed = false;
    this.created = new Date();
  }
}
