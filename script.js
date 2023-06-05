// Javascript for Task Planner Project

// Create TaskPlanner class and assign values from input form

class TaskPlanner {
  constructor() {
    this.taskForm = document.getElementById("taskForm");
    this.taskName = document.getElementById("taskName");
    this.checkField = document.getElementById("checkField");
    this.description = document.getElementById("description");
    this.assignTo = document.getElementById("assignTo");
    this.dueDate = document.getElementById("dueDate");
    this.status = document.getElementById("status");
    this.taskCards = document.getElementById("taskCards");
    this.submitCard = document.getElementById("submitCard");

    
//// <------------------------------






//// <------------------------------


  // Create a new card and output HTML to page
  createCard() {
    this.taskCards.innerHTML = "";
    this.taskData.forEach((a, b) => {
      const taskElement = document.createElement("div");
      taskElement.id = b;
      const taskContent = `
      <div class="col pt-4 px-3">
      <div class="card text-white bg-success">
        <div class="card-header">${b + 1}</div>  
          <div class="card-body">
            <p class="fw-bold">Task Name: ${a.name}</p>
            <p class="card-text">Description: ${a.description}</p>
            <p class="card-text">Assigned To: ${a.assign}</p>
            <p class="card-text">Due Date: ${a.date}</p>
            <p class="card-text">Status: ${a.status}</p>
            <span class="card-text cardOptions">
              <button onClick = "taskPlanner.editCard(this)" data-bs-toggle="modal" data-bs-target="#taskForm" class="fa-regular fa-pen-to-square btn btn-light btn-sm"></button>
              <button onClick = "taskPlanner.deleteCard(this); taskPlanner.createCard()" class="fa-regular fa-trash-can btn btn-light btn-sm"></button>
            </span>
          </div>
         </div>
         </div>
      `;
      taskElement.innerHTML = taskContent;
      this.taskCards.appendChild(taskElement);
    });
  }

  
  deleteCard(element) {
    const taskElement = element.parentElement.parentElement;
    const taskId = parseInt(taskElement.id);
    // Remove the task element from DOM
    taskElement.remove();
     // Remove task data from array
    this.taskData.splice(taskId, 1);
    // Save the updated data to the local storage
    localStorage.setItem("taskData", JSON.stringify(this.taskData));
    console.log('Deleted card');
    console.log(this.taskData);
  }
  

  editCard(element) {
   let selectedTask = element.parentElement.parentElement;
   // Form field pre-filling wih data
   this.taskName.value = selectedTask.children[0].innerHTML.replace("Task Name: ", "");
   this.description.value = selectedTask.children[1].innerHTML.replace("Description: ", "");
   this.assignTo.value = selectedTask.children[2].innerHTML.replace("Assigned To: ", "");
   this.dueDate.value = selectedTask.children[3].innerHTML.replace("Due Date: ", "");
   // Fix for drop-down list returing "undefined", if card is edited.
   const statusValue = selectedTask.children[4].innerHTML.replace("Status: ", "");
   const statusOptions = this.status.options;
   for (let i = 0; i < statusOptions.length; i++) {
    if (statusOptions[i].value === statusValue) {
      statusOptions[i].selected = true;
      break;
    }
}
    this.deleteCard(element);
  }
  
  // Reset the form to default values
  clearForm() {
    this.taskName.value = "";
    this.description.value = "";
    this.dueDate.value = "";
    this.assignTo.value = "";
    this.status.value = "";
    console.log('Clear form');
    console.log(this.taskData);
  }

  // Load data from the local storage, or initialize an empty array if no data exists
  loadData() {
    this.taskData = JSON.parse(localStorage.getItem("taskData")) || [];
    console.log('Load data');
    console.log(this.taskData);
    this.createCard();
  }
}

const taskPlanner = new TaskPlanner();

