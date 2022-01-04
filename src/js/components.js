import { Todo } from "../classes";
import { todoList } from "../index";

const $divTodoList = document.querySelector(".todo-list");
const $txtInput = document.querySelector(".new-todo");
const $buttonDeleteAll = document.querySelector(".clear-completed");
const $ulFilters = document.querySelector(".filters");
const $filters = document.querySelectorAll(".filtro");

export const createTodoHtml = (todo) => {
  const $htmlTodo = `
  <li class="${todo.completed ? "completed" : ""}" data-id="${todo.id}">
  <div class="view">
    <input class="toggle" type="checkbox" ${todo.completed ? "checked" : ""}>
    <label>${todo.text}</label>
    <button class="destroy"></button>
  </div>
  <input class="edit" value="Create a TodoMVC template">
  </li>
  `;

  const $constainerTodo = document.createElement("div");
  $constainerTodo.innerHTML = $htmlTodo;
  $divTodoList.append($constainerTodo.firstElementChild);

  return $constainerTodo.firstElementChild;
};

// events
$txtInput.addEventListener("keyup", (event) => {
  if (event.keyCode === 13 && $txtInput.value.length > 0) {
    const newTodo = new Todo($txtInput.value);
    todoList.addTodo(newTodo);
    createTodoHtml(newTodo);
    $txtInput.value = "";
  }
});

$divTodoList.addEventListener("click", (event) => {
  const nameElement = event.target.localName; // input, label, button
  const todoElement = event.target.parentElement.parentElement;
  const todoId = todoElement.getAttribute("data-id");

  if (nameElement.includes("input")) {
    todoList.checkTodo(todoId);
    todoElement.classList.toggle("completed");
  }

  if (nameElement.includes("button")) {
    todoList.deleteTodo(todoId);
    $divTodoList.removeChild(todoElement);
  }
  console.log(todoList);
});

$buttonDeleteAll.addEventListener("click", () => {
  todoList.deleteCompletedTodo();
  for (let i = $divTodoList.children.length - 1; i >= 0; i--) {
    const element = $divTodoList.children[i];
    if (element.classList.contains("completed")) {
      $divTodoList.removeChild(element);
    }
  }
});

$ulFilters.addEventListener("click", (event) => {
  const filter = event.target.text;
  if (!filter) {
    return;
  }
  $filters.forEach((element) => element.classList.remove("selected"));
  event.target.classList.add("selected");

  for (const element of $divTodoList.children) {
    element.classList.remove("hidden");
    const completed = element.classList.contains("completed");

    switch (filter) {
      case "Pending":
        if (completed) {
          element.classList.add("hidden");
        }
        break;
      case "Completed":
        if (!completed) {
          element.classList.add("hidden");
        }
        break;
    }
  }
});
