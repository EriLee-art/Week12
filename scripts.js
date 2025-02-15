/**
 *  Coding Steps:
            
            Create a CRD application (CRUD without update) using json-server or another API
            Use fetch and async/await to interact with the API
            Use a form to create/post new entities
            Build a way for users to delete entities
            Include a way to get entities from the API and display them
            You do NOT need update, but you can add it if you'd like
            Use Bootstrap and/or CSS to style your project
 */

let mealList = [];
const notesContainer = document.getElementById(`notes`);

function renderNotesList() {
    notesContainer.innerHTML = "";

    mealList.map(renderNotes).forEach(div => notesContainer.appendChild(div));
    formDefault();
}

// Renders Notes from the notesList and displays them

function renderNotes(meal) {
    const mealDiv = document.createElement("div");
    mealDiv.className = "bg-light mb-3 p-4"
    mealDiv.innerHTML = `
        <h5>${meal.id}) ${meal.foodItem} - ${meal.mealTime}</h5>
        <p>${meal.servingSize} Per Serving</p>
        <p>${meal.calories} Calories</p>
        <button id="delete-button" class="btn btn-danger ms-3">Delete</button>`

    mealDiv.querySelector(`#delete-button`).addEventListener(`click`, async () => {
        await deleteNotes(meal.id);

        const indexToDelete = mealList.indexOf(meal);
        mealList.splice(indexToDelete, 1);

        renderNotesList();
    })
    return mealDiv
}

// Creates Notes
function submitToDatabase(event) {
    event.preventDefault();
    const mealTime = document.getElementById(`mealTime`).value;
    const foodItem = document.getElementById(`foodItem`).value;
    const servingSize = document.getElementById(`serving`).value;
    const calories = document.getElementById(`cals`).value;

    const meal = { 
        mealTime: mealTime, 
        foodItem: foodItem, 
        servingSize: servingSize,
        calories: parseInt(calories)
    };
    
    postNotes(meal);
    renderNotesList();
}


// Fetches Notes
async function getNotes() {
    const response = await fetch("http://localhost:3000/meal");
    return response.json();
}

// Deletes Notes
async function deleteNotes(idToDelete) {
    await fetch(`http://localhost:3000/meal/` + idToDelete, {
        method: `DELETE`
    })
}

// Posts Notes
async function postNotes(noteMeal) {
    const response = await fetch("http://localhost:3000/meal", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(noteMeal)
    })
    return response.json();
}

// Return form to default
const formDefault = () => {
    document.getElementById(`notes-form`).reset();
}

// Application startup
async function startUp() {
    renderNotesList();
    mealList = await getNotes();
    renderNotesList();
}

startUp();