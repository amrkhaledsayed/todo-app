import { containerTask, inputTask } from "./element.js";

export const renderTaskList = (tasks) => {
  let result = "";
  tasks.forEach((task) => {
    result += `
      <li class="TaskList__taskContent ${
        task.isCompleted ? "TaskList__taskContent--isActive" : ""
      }">
        <div class="TaskList__checkbox" tabindex="0" role="button">
          <img
            class="TaskList__checkboxImg"
            src="/assets/icon-checkmark.svg"
            alt="icon-checkmark"
          />
        </div>
        <div class="TaskList__valueContent">
          <p class="TaskList__value">${task.value}</p>
          <i class="fa-solid fa-trash-can TaskList__deleteIcon" style="color: #ee2b2b;"></i>
        </div>
      </li>
    `;
  });

  containerTask.innerHTML = result;
  inputTask.value = "";
};
