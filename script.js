// Javascript for Task Planner Project


// Delcare variables and assign inputs to them
const formTask = document.getElementById("formTask");
const taskInput = document.getElementById("taskName");
const descriptionInput = document.getElementById("description");
const assignToInput = document.getElementById("assignTo");
const dueDateInput = document.getElementById("dueDate");
const statusInput = document.getElementById("status");
const submitForm = document.getElementById("submitForm");
const cardsOutput = document.getElementById("cards");


// Add event listener to button
formTask.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("The button has been clicked");
    inputData(); // Call inputData function when button is clicked
});


// Store inputs in taskData
let taskData = [];


// Push data into array
let inputData = function () {
    taskData.push({
        cardName: taskInput.value,
        cardDescription: descriptionInput.value,
        cardAssignTo: assignToInput.value,
        cardDueDate: dueDateInput.value,
        cardStatus: statusInput.value,
    });
    console.log(taskData);
    createCard(); // Call createCard function
};

// Create a new card
let createCard = () => {
    taskData.map((cardInput, CardId) => {
        return (cardsOutput.innerHTML += `
        <div class="col-sm-4 mb-3 mb-sm-0" id="${CardId}">
          <div class="card bg-warning bg-gradient">
            <div class="card-body">
              <h5 class="card-title">Name: ${cardInput.cardName}</h5>
              <p class="card-text"><strong>Description:</strong> ${cardInput.cardDescription}</p>
              <p class="card-text"><strong>Assigned To:</strong> ${cardInput.cardAssignTo}</p>
              <p class="card-text"><strong>Due Date:</strong> ${cardInput.cardDueDate}</p>
              <p class="card-text"><strong>Status:</strong> ${cardInput.cardStatus}</p>
              <span class="cardOptions">
               <i onClick="editCard(this)">Edit</i>
               <i onClick="deleteCard(this)">Delete</i>
             </span>
            </div>
          </div>
        </div>
        `);
    });
    clearForm(); // Call clearForm function
};


// Clear the form after submitting the task
const clearForm = function () {
    taskInput.value = '',
    descriptionInput.value = '';
    assignToInput.value = '';
    dueDateInput.value = '';
    statusInput.value = '';
}