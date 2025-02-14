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

const submitBtn = document.getElementById(`submitBtn`);
const notesContainer = document.getElementById(`notes`);

// Creates Notes
submitBtn.addEventListener(`click`, (event) => {
    event.preventDefault();
    const mealTime = document.getElementById(`mealTime`).value;
    const foodItem = document.getElementById(`foodItem`).value;
    const calories = document.getElementById(`cals`).value;

    const meal = { mealTime: mealTime, foodItem: foodItem, calories: calories };
    async () => {
        await fetch("http://localhost:3000/meal/", {
            method: "POST",
            headers: {"Content-Type": "application/JSON"},
            body: JSON.stringify(meal)
        })
        getNotes();
    }
})

// Deletes Notes
async function deleteNotes(id) {
    await fetch(`http://localhost:3000/meal/${id}`, {
        method: `DELETE`
    })
}

// Grabs Notes from the Database and displays them

async function getNotes() {
    const response = await fetch("http://localhost:3000/meal");
    const notes = await response.json();

        notesContainer.innerHTML = notes.map(meal =>
            `<div>${meal.mealTime}</div>
            <div>${meal.foodItem}</div>
            <div>${meal.calories} Calories</div>
            <button class="btn btn-danger ms-3">Delete</button>`);

        notesContainer.querySelector(`.btn-danger`).addEventListener(`click`, () => {
            deleteNotes(meal.id);

            const indexToDelete = notes.indexOf(meal);
            notes.splice(indexToDelete, 1);
    })
}

getNotes();