import {
  addTaskButton,
  containerTask,
  getDeleteIcons,
  toggleDarkMode,
  toggleTaskListLink,
  getCheckIcons,
} from "./element.js";
import { addElements, darkMode, deleteTask, toggleTask } from "./utils.js";

export const initTaskLisreners = () => {
  getDeleteIcons().forEach((icon, index) => {
    icon.addEventListener("click", (e) => deleteTask(e, index));
  });
  getCheckIcons().forEach((box, index) => {
    box.addEventListener("click", (e) => toggleTask(e, index));
    box.addEventListener("keydown", (e) => {
      e.key === "Enter" && toggleTask(e, index);
    });
  });
};
export const initListeners = () => {
  toggleDarkMode.addEventListener("click", darkMode);
  addTaskButton.addEventListener("click", addElements);
  toggleTaskListLink.addEventListener("click", () => {
    toggleTaskListLink.classList.toggle("TaskList__link--isActive");
    containerTask.classList.toggle("TaskList__list--hideCompleted");
  });
};
