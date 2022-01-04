import { Todo } from "./Todo";

export class TodoList {
  constructor() {
    this.showLocalStorage();
  }
  addTodo(todo) {
    this.list.push(todo);
    this.saveLocalStorage();
  }

  deleteTodo(id) {
    this.list = this.list.filter((todo) => todo.id != id);
    this.saveLocalStorage();
  }
  checkTodo(id) {
    for (const todo of this.list) {
      if (todo.id == id) {
        todo.completed = !todo.completed;
        break;
      }
    }
  }
  deleteCompletedTodo() {
    this.list = this.list.filter((todo) => !todo.completed);
    this.saveLocalStorage();
  }
  // in local storage we dont have expiration time and only we can save strings
  // we have 1 localstorage per domain, and only work for this domamin
  saveLocalStorage() {
    localStorage.setItem("todo", JSON.stringify(this.list));
  }
  showLocalStorage() {
    this.list = localStorage.getItem("todo")
      ? JSON.parse(localStorage.getItem("todo"))
      : [];

    this.list = this.list.map(Todo.fromJson);
  }
}
