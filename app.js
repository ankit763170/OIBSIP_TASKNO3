// Array to store tasks
let tasks = [];

// Function to add a new task
function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    const task = {
      id: Date.now(),
      text: taskText,
      completed: false
    };

    tasks.push(task);

    taskInput.value = "";
    renderTasks();
  }
}

// Function to mark a task as complete
function toggleComplete(taskId) {
  const task = tasks.find(t => t.id === taskId);

  if (task) {
    task.completed = !task.completed;
    renderTasks();
  }
}

// Function to delete a task
function deleteTask(taskId) {
  tasks = tasks.filter(t => t.id !== taskId);
  renderTasks();
}

// Function to render tasks
function renderTasks() {
  const taskList = document.getElementById("taskList");
  const completedList = document.getElementById("completedList");

  // Clear task lists
  taskList.innerHTML = "";
  completedList.innerHTML = "";

  // Render pending tasks
  tasks
    .filter(t => !t.completed)
    .forEach(task => {
      const listItem = document.createElement("li");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.completed;
      checkbox.addEventListener("change", () => toggleComplete(task.id));
      listItem.appendChild(checkbox);
      listItem.appendChild(document.createTextNode(task.text));
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => deleteTask(task.id));
      listItem.appendChild(deleteButton);
      taskList.appendChild(listItem);
    });

  // Render completed tasks
  tasks
    .filter(t => t.completed)
    .forEach(task => {
      const listItem = document.createElement("li");
      listItem.classList.add("complete");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.completed;
      checkbox.addEventListener("change", () => toggleComplete(task.id));
      listItem.appendChild(checkbox);
      listItem.appendChild(document.createTextNode(task.text));
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => deleteTask(task.id));
      listItem.appendChild(deleteButton);
      completedList.appendChild(listItem);
    });
}
