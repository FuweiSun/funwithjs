let taskList = document.getElementById("taskList");
let taskInput = document.getElementById("taskInput");

function addTask() {
  if (taskInput.value.trim()) {
    let task = document.createElement("li");
    task.innerText = taskInput.value;
    taskList.appendChild(task);
    taskInput.value = "";
  } else {
    alert("Please enter a valid task.");
  }
}

taskInput.addEventListener("keydown", function (event) {
  if (event.code === "Enter") {
    addTask();
  }
});

taskList.addEventListener("click", function (event) {
  if (event.target.tagName === "LI") {
    event.target.classList.toggle("completed");
  }
});