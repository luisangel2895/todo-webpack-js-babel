import "./styles.css";
import { TodoList } from "./classes";
import "./js/components";
import { createTodoHtml } from "./js/components";

export const todoList = new TodoList();

// todoList.list.forEach((todo) => createTodoHtml(todo));
todoList.list.forEach(createTodoHtml);

console.log(todoList);
