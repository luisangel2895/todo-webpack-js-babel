export class Todo {
  static fromJson({ id, text, completed, created }) {
    const tempTodo = new Todo(text);
    tempTodo.id = id;
    tempTodo.completed = completed;
    tempTodo.created = created;
    return tempTodo;
  }

  constructor(todo) {
    this.text = todo;
    this.id = new Date().getTime(); // with this we get the linux time 12342356
    this.completed = false;
    this.created = new Date();
  }
}
