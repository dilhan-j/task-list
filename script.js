// Create Task and TaskPlanner classes and assign values from input form

class Task {
    constructor(id, name, description, assign, status, date) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.assign = assign;
      this.status = status;
      this.date = date;
    }
  }
  
  
  class TaskPlanner {
    constructor() {
      this.taskForm = document.getElementById("taskForm");
      this.taskName = document.getElementById("taskName");
      this.checkNameField = document.getElementById("checkNameField");
      this.description = document.getElementById("description");
      this.checkdescField = document.getElementById("checkdescField");
      this.assignTo = document.getElementById("assignTo");
      this.checkAssignField = document.getElementById("checkAssignField");
      this.dueDate = document.getElementById("dueDate");
      this.checkDateField = document.getElementById("checkDateField");
      this.status = document.getElementById("status");
      this.checkStatusField = document.getElementById("checkStatusField");
      this.taskCards = document.getElementById("taskCards");
      this.submitCard = document.getElementById("submitCard");
      // Store data
      this.taskData = [];
      this.taskCount = 0
      // Initialize the task planner
      this.initialize();
    }
  
  
    initialize() {
      this.taskForm.addEventListener("submit", (event) => {
        event.preventDefault();
        this.checkForm();
      });
  
      // "Add" button click event listener
      this.submitCard.addEventListener("click", () => {
        this.submitCard.setAttribute("data-bs-dismiss", "");
      });
      
      // Load the data from local storage
      this.loadData();
    }
  
  
    checkForm() {
      let isFormValid = true;
      this.checkNameField.innerHTML = "";
      this.checkdescField.innerHTML = "";
      this.checkAssignField.innerHTML = "";
      this.checkDateField.innerHTML ="";
      this.checkStatusField.innerHTML = ""; 
  
      if (this.taskName.value === "" || this.taskName.value.length < 8) {
        console.log("Invalid taskName");
        this.checkNameField.innerHTML = "The Task Name should not be empty and be more than 8 characters";
        isFormValid = false;
  
      } else if (this.description.value === "" || this.description.value.length < 15) {
        this.checkNameField.innerHTML = "";
        console.log("Invalid description");
        this.checkdescField.innerHTML = "The Description should not be empty and more be than 15 characters";
        isFormValid = false;
  
      } else if (this.assignTo.value === "" || this.assignTo.value.length < 8) {
        this.checkdescField.innerHTML = "";
        console.log("Invalid assignTo");
        this.checkAssignField.innerHTML = "The Assigned To field should not be empty and be more than 8 characters";
        isFormValid = false;
  
      } else if (this.dueDate.value === "") {
        this.checkAssignField.innerHTML = "";
        console.log("Invalid dueDate");
        this.checkDateField.innerHTML = "Please select a Due Date";
        isFormValid = false;
  
      } else if (this.status.value === "") {
        this.checkDateField.innerHTML ="";
        console.log("Invalid status");
        this.checkStatusField.innerHTML = "Please select a Status";
        isFormValid = false;
  
      } else {
        console.log("Form is valid");
        this.checkStatusField.innerHTML = "";
        this.inputData();
        this.submitCard.setAttribute("data-bs-dismiss", "modal");
        this.submitCard.click();
      }
    }
  
  
    // Gather user input
    inputData() {
      const id = ++this.taskCount;
      const task = new Task(
        id,
        this.taskName.value,
        this.description.value,
        this.assignTo.value,
        this.status.value,
        this.dueDate.value
      );
      this.taskData.push(task);
      // Save the data to local storage
      localStorage.setItem("taskData", JSON.stringify(this.taskData));
      console.log("Store data");
      console.log(this.taskData);
      this.createCard();
      this.clearForm();
    }
  
     
    deleteCard(taskId) {
      const taskElement = document.getElementById(`task_${taskId}`);
     
      // Remove the event listeners from the buttons
      const doneButton = taskElement.querySelector(".checkDone");
      doneButton.removeEventListener("click", () => this.markDone(taskId));
      
      // Remove the task element from DOM
      taskElement.remove();
      
      // Remove task data from array
      this.taskData.splice(taskId, 1);
      
      // Save the updated data to the local storage
      localStorage.setItem("taskData", JSON.stringify(this.taskData));
      console.log("Deleted card");
      console.log(this.taskData);
      
      // Recreate the cards
      this.createCard();
    }
    
 
    createCard() {
      this.taskCards.innerHTML = "";
       // Clear the taskCards element
      this.taskData.forEach((task, taskId) => {
        const taskElement = document.createElement("div");
         // Add a prefix to the task ID
        taskElement.id = `task_${taskId}`;
        const taskContent = `
          <div class="col pt-4 px-3">
            <div class="card text-white bg-primary">
              <div class="card-body">
                <p class="fw-bold">Task Name: ${task.name}</p>
                <p class="card-text">Description: ${task.description}</p>
                <p class="card-text">Assigned To: ${task.assign}</p>
                <p class="card-text">Due Date: ${task.date}</p>
                <p class="card-text">Status: ${task.status}</p>
                <span class="card-text cardOptions">
                  <button title="Edit Task" onClick="taskPlanner.editCard(${taskId})" data-bs-toggle="modal" data-bs-target="#taskForm" class="fa-regular fa-pen-to-square btn btn-light btn-sm"><span class="cardBtn">&nbsp;Edit</span></button>
                  <button title="Delete Task" onClick="taskPlanner.deleteCard(${taskId})" class="fa-regular fa-trash-can btn btn-light btn-sm"><span class="cardBtn">&nbsp;Delete</span></button>
                  <button title="Mark as Done" onClick="taskPlanner.markDone(${taskId})" class="checkDone fa-regular fa-square-check btn btn-light btn-sm ${task.status.toLowerCase() === "done" ? "done" : ""}"><span class="cardBtn">&nbsp;Done</span></button>         
                </span>
              </div>
            </div>
          </div>
        `;
        taskElement.innerHTML = taskContent;
        this.taskCards.appendChild(taskElement);
        
        const doneButton = taskElement.querySelector(`#task_${taskId} .cardOptions .checkDone`);
        doneButton.addEventListener("click", () => {
          if (task.status.toLowerCase() !== "done") {
            this.markDone(taskId);
          }
        });
      });
    }
    
    
    editCard(taskId) {
      this.checkNameField.innerHTML = "";
      this.checkdescField.innerHTML = "";
      this.checkAssignField.innerHTML = "";
      this.checkDateField.innerHTML = "";
      this.checkStatusField.innerHTML = "";
      // Retrieve the task data from the taskData array using the taskId
      const task = this.taskData[taskId]; 
      // Reset the form fields
      this.clearForm();
      // Pre-fill the form with the task data
      this.taskName.value = task.name;
      this.description.value = task.description;
      this.assignTo.value = task.assign;
      this.dueDate.value = task.date;
      // Find the corresponding status option and select it
      const statusOptions = this.status.options;
      for (let i = 0; i < statusOptions.length; i++) {
        if (statusOptions[i].value === task.status) {
          statusOptions[i].selected = true;
          break;
        }
      }
      // Delete the task card
      this.deleteCard(taskId);
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
      console.log("Clear form");
      console.log(this.taskData);
    }
  
    // Load data from the local storage, or initialize an empty array if no data exists
    loadData() {
      this.taskData = JSON.parse(localStorage.getItem("taskData")) || [];
      console.log("Load data");
      console.log(this.taskData);
      this.createCard();
    }
  }
  
    const taskPlanner = new TaskPlanner();