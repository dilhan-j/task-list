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
    
    // Store data
    this.taskData = [{}];
    
    // Initialize the task planner
    this.initialize();
  }

  initialize() {
    this.taskForm.addEventListener("submit", (element) => {
      element.preventDefault();
      this.checkForm();
    });

    // "Add" button click event listener
    this.submitCard.addEventListener("click", () => {
      this.submitCard.setAttribute("data-bs-dismiss", "");
    });
    
    // Load the data from local storage
    this.loadData();
  }
  
  // Check if "taskName" is valid and run "inputData"
  checkForm() {
    if (this.taskName.value === "") {
      console.log("taskName field is empty");
      this.checkField.innerHTML = "The Task Name can't be empty";
    } else {
      console.log("taskName is valid");
      this.checkField.innerHTML = "";
      this.inputData();
      this.submitCard.setAttribute("data-bs-dismiss", "modal");
      this.submitCard.click();
    }
  }

  // Store data as objects
  inputData() {
    this.taskData.push({
      name: this.taskName.value,
      description: this.description.value,
      assign: this.assignTo.value,
      status: this.status.value,
      date: this.dueDate.value,
    });
    
    // Save the data to local storage
    localStorage.setItem("taskData", JSON.stringify(this.taskData));
    console.log('Store data');
    console.log(this.taskData);
    this.createCard();
    this.clearForm();
  }

  // Create a new card and output HTML to page
  createCard() {
    this.taskCards.innerHTML = "";
    this.taskData.forEach((taskDisp, taskId) => {
      const taskElement = document.createElement("div");
      taskElement.id = taskId;
 //     const markDoneBtn = taskData.status !== "Done" ? `<button onClick="taskPlanner.markDone(${taskId})" class="btn btn-primary">Mark as Done</button>` : "";
      const taskContent = `
      <div class="col pt-4 px-3">
      <div class="card text-white bg-success">
        <div class="card-header">ID: ${taskId + 1}</div>  
          <div class="card-body">
            <p class="fw-bold">Task Name: ${taskDisp.name}</p>
            <p class="card-text">Description: ${taskDisp.description}</p>
            <p class="card-text">Assigned To: ${taskDisp.assign}</p>
            <p class="card-text">Due Date: ${taskDisp.date}</p>
            <p class="card-text">Status: ${taskDisp.status}</p>
            <span class="card-text cardOptions">
              <button title="Edit Task" onClick = "taskPlanner.editCard(this)" data-bs-toggle="modal" data-bs-target="#taskForm" class="fa-regular fa-pen-to-square btn btn-light btn-sm"><span class="cardBtn">&nbsp;Edit</span></button>
              <button title="Delete Task" onClick = "taskPlanner.deleteCard(this); taskPlanner.createCard()" class="fa-regular fa-trash-can btn btn-light btn-sm"><span class="cardBtn">&nbsp;Delete</span></button>
              <button title="Mark as Done" onClick = "taskPlanner.markDone(${taskId})" class="fa-regular fa-square-check btn btn-light btn-sm"><span class="cardBtn">&nbsp;Done</span></button>
            </span>
          </div>
         </div>
         </div>
      `;
      taskElement.innerHTML = taskContent;
      this.taskCards.appendChild(taskElement);
    });
  }

//<button title="Mark as Done" onClick = "taskPlanner.markDone(${taskId})" class="fa-regular fa-square-check btn btn-light btn-sm"></button>

  
  deleteCard(element) {
    const taskElement = element.parentElement.parentElement;
    const taskIdDel = parseInt(taskElement.id);
    // Remove the task element from DOM
    taskElement.remove();
     // Remove task data from array
    this.taskData.splice(taskIdDel, 1);
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

  markDone(taskId) {
    // Change status of task to "Done" and save data to local storage
    this.taskData[taskId].status = "Done";
    localStorage.setItem("taskData", JSON.stringify(this.taskData));
    this.createCard();
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

