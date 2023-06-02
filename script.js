// Javascript for task planner


// Delcare variables and assign inputs to them
const formTask = document.getElementById("formTask");
const taskInput = document.getElementById("taskName");
const descriptionInput = document.getElementById("description");
const assignToInput = document.getElementById("assignTo");
const dueDateInput = document.getElementById("dueDate");
const statusInput = document.getElementById("status");
const submitForm = document.getElementById("submitForm")


// Add event listener to button
formTask.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("The button has been clicked");
//    formValidation();
inputData();
});


// Store inputs in taskData
let taskData = [{}];


// Push data into array
let inputData = () => {
    taskData.push({
        taskName: taskInput.value,
        description: descriptionInput.value,
        assignTo: assignToInput.value,
        dueDate: dueDateInput.value,
        status: statusInput.value,
    });
    console.log(taskData);
};
