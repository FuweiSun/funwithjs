// Get the form and input elements
const form = document.querySelector('form');
const input = form.querySelector('input[type="text"]');

// Get the to-do and completed list elements
const todoList = document.querySelector('#todo-list');
const completedList = document.querySelector('#completed-list');

// Initialize an empty array for the tasks
let tasks = [];

// Function to render the tasks in the to-do and completed lists
function render() {
    // Clear the to-do and completed lists
    todoList.innerHTML = '';
    completedList.innerHTML = '';
  
    // Loop through the tasks array
    tasks.forEach((task, index) => {
      // Create a new list item element
      const li = document.createElement('li');
  
      // Create a new span element for the task name
      const span = document.createElement('span');
      span.innerText = task.name;
  
      // Create a new button element for completing the task
      const completeButton = document.createElement('button');
      completeButton.innerText = 'Complete';
      completeButton.addEventListener('click', () => {
        // Move the task from the to-do list to the completed list
        const completedTask = tasks.splice(index, 1)[0];
        completedTask.completed = true;
        tasks.push(completedTask);
  
        // Render the updated lists
        render();
      });
  
      // Create a new button element for deleting the task
      const deleteButton = document.createElement('button');
      deleteButton.innerText = 'Delete';
      deleteButton.addEventListener('click', () => {
        // Delete the task from the array
        tasks.splice(index, 1);
  
        // Render the updated lists
        render();
      });
  
      // Append the span and buttons to the list item element
      li.appendChild(span);
      li.appendChild(completeButton);
      li.appendChild(deleteButton);
  
      // Append the list item to the appropriate list
      if (task.completed) {
        li.classList.add('completed');
        completedList.appendChild(li);
      } else {
        todoList.appendChild(li);
      }
    });
  }
  
  // Add an event listener to the form for submitting a new task
  form.addEventListener('submit', event => {
    // Prevent the default form submission behavior
    event.preventDefault();
  
    // Get the name of the new task
    const name = input.value.trim();
  
    // If the name is not empty, create a new task and add it to the array
    if (name !== '') {
      const task = {
        name: name,
        completed: false
      };
      tasks.push(task);
  
      // Clear the input field
      input.value = '';
  
      // Render the updated lists
      render();
    }
  });
  
  // Render the initial lists
  render();
  