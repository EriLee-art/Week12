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

// Array used to display and sync data between the db.json and web page
let mealList = [];

// Used in the rendering of meals
const notesContainer = document.getElementById(`notes`);

// Renders all the meals from mealList
function renderNotesList() {
    notesContainer.innerHTML = "";

    mealList.map(renderNotes).forEach(div => notesContainer.appendChild(div));
    formDefault();
}

// Renders the individual meals from the mealList
function renderNotes(meal) {
    const mealDiv = document.createElement("div");
    mealDiv.innerHTML = `
    <div id="mealNotes" class="mb-3 p-4">
        <h5 class="mb-3">${meal.id}) ${meal.foodItem} - ${meal.mealTime}</h5>
        <p>${meal.servingSize} Per Serving</p>
        <p>${meal.calories} Calories</p>
        <button id="delete-button" class="btn btn-danger ms-3">Delete</button>
    </div>`

    mealDiv.querySelector(`#delete-button`).addEventListener(`click`, async () => {
        await deleteNotes(meal.id);

        const indexToDelete = mealList.indexOf(meal);
        mealList.splice(indexToDelete, 1);

        renderNotesList();
    })
    return mealDiv
}

// Creates meal
async function submitToDatabase(event) {
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
    
    await postNotes(meal);
    renderNotesList();
}


// Fetches meals
async function getNotes() {
    const response = await fetch("http://localhost:3000/meal");
    return response.json();
}

// Deletes meals
async function deleteNotes(idToDelete) {
    await fetch(`http://localhost:3000/meal/` + idToDelete, {
        method: `DELETE`
    })
}

// Posts meals
async function postNotes(noteMeal) {
    const response = await fetch("http://localhost:3000/meal", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(noteMeal)
    })
    return response.json();
}

// Returns form to default
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