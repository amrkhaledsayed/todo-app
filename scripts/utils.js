import { initTaskLisreners } from "./addEvent.js";
import { app, containerTask, inputTask } from "./element.js";
import { renderTaskList } from "./renderTaskList.js";

export const renderEmptyStates = () => {
  containerTask.innerHTML = `
    <li class="EmptyList">
      <img src="/assets/icon-empty.svg" alt="empty-icon" class="EmptyList__img" />
      <p>قائمة المهام فارغة</p>
    </li>
  `;
};

export const initTaskList = (tasks) => {
  if (tasks?.length) {
    renderTaskList(tasks);
    initTaskLisreners();
  } else {
    renderEmptyStates();
  }
};

export const addElements = (e) => {
  e.preventDefault();
  let valueTask = inputTask.value.trim();
  if (!valueTask) {
    alert("Please enter a task");
    inputTask.value = " ";
    return;
  }

  if (valueTask.length < 3) {
    alert("Please enter a task with at least 4 characters.");
    inputTask.value = " ";
    return;
  }
  const task = {
    value: inputTask.value,
    isCompleted: false,
  };

  const tasks = fetchData("tasks") || [];
  tasks.push(task);
  saveToDB("tasks", tasks);

  initTaskList(tasks);
};

export const initDataOnStartUp = () => {
  fetchData("darkModeFlag") && darkMode();

  initTaskList(fetchData("tasks"));
};

export const darkMode = () => {
  app.classList.toggle("App--isDark");
  saveToDB("darkModeFlag", app.classList.contains("App--isDark"));
};

export const fetchData = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

export const saveToDB = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const deleteTask = (e, index) => {
  const answer = confirm("هل أنت متأكد من حذف المهمة؟");
  if (answer === false) return;

  const tasks = fetchData("tasks");

  tasks.splice(index, 1);
  saveToDB("tasks", tasks);
  initTaskList(tasks);
};

export const toggleTask = (e, index) => {
  const tasks = fetchData("tasks");

  e.currentTarget.parentElement.classList.toggle(
    "TaskList__taskContent--isActive"
  );
  tasks[index].isCompleted = !tasks[index].isCompleted;
  saveToDB("tasks", tasks);
};
