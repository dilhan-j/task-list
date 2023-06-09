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
    this.assignTo = document.getElementById("assignTo");
    this.dueDate = document.getElementById("dueDate");
    this.status = document.getElementById("status");
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
    
    if (this.taskName.value === "" || this.taskName.value.length < 8) {
      console.log("Invalid taskName");
      this.checkField.innerHTML = "The Task Name should not be empty and be more than 8 characters";
      isValid = false;
    } else if (this.description.value === "" || this.description.value.length < 15) {
      console.log("Invalid description");
      this.checkField.innerHTML = "The Description should not be empty and more be than 15 characters";
      isValid = false;
    } else if (this.assignTo.value === "" || this.assignTo.value.length < 15) {
      console.log("Invalid assignTo");
      this.checkField.innerHTML = "The Assigned To field should not be empty and be more than 15 characters";
      isValid = false;
    } else if (this.dueDate.value === "") {
      console.log("Invalid dueDate");
      this.checkField.innerHTML = "Please select a Due Date";
      isValid = false;
    } else if (this.status.value === "") {
      console.log("Invalid status");
      this.checkField.innerHTML = "Please select a Status";
      isValid = false;
    } else {
      console.log("Form is valid");
      this.checkField.innerHTML = "";
    }
    
    if (isFormValid) {
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

  // Create a new card and output HTML to page
  createCard() {
    this.taskCards.innerHTML = "";
    this.taskData.forEach((task, id) => {
      const taskElement = document.createElement("div");
      taskElement.id = id;
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
                <button title="Edit Task" onClick="taskPlanner.editCard(this)" data-bs-toggle="modal" data-bs-target="#taskForm" class="fa-regular fa-pen-to-square btn btn-light btn-sm"><span class="cardBtn">&nbsp;Edit</span></button>
                <button title="Delete Task" onClick="taskPlanner.deleteCard(this); taskPlanner.createCard()" class="fa-regular fa-trash-can btn btn-light btn-sm"><span class="cardBtn">&nbsp;Delete</span></button>
                <button title="Mark as Done" onClick="taskPlanner.markDone(${id})" class="checkDone fa-regular fa-square-check btn btn-light btn-sm ${task.status.toLowerCase() === "done" ? "done" : ""}"><span class="cardBtn">&nbsp;Done</span></button>         
              </span>
            </div>
          </div>
        </div>
      `;
      taskElement.innerHTML = taskContent;
      this.taskCards.appendChild(taskElement);
      const doneButton = taskElement.querySelector(`#taskCards > div[id="${id}"] .cardOptions .checkDone`);
      doneButton.addEventListener("click", () => {
        if (task.status.toLowerCase() !== "done") {
          this.markDone(id);
        }
      });
    });
  }
  
  deleteCard(element) {
    const taskElement = element.parentElement.parentElement;
    const id = parseInt(taskElement.id);
    // Remove the task element from DOM
    taskElement.remove();
     // Remove task data from array
    this.taskData.splice(id, 1);
    // Save the updated data to the local storage
    localStorage.setItem("taskData", JSON.stringify(this.taskData));
    console.log("Deleted card");
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

markDone(id) {
  // Change status of task to "Done" and save data to local storage
  this.taskData[id].status = "Done";
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
