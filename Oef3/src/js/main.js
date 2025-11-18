// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap’s JS
import * as bootstrap from 'bootstrap'

//eigen js
const oefening = [];
const oefeningTime = [];

function renderTodos() {
    const list = document.getElementById("ex1_list");

    list.innerHTML = oefening
        .map((task, index) => `
      <li class="list-group-item d-flex justify-content-between align-items-center ${task.done ? "todo-done" : ""}">
        <span class="todo-text" data-idx="${index}">
           ${task.text}
        </span>
        <p class="todo-del" data-idx="${index}">Total minuten:</p>
      </li>
    `)
        .join("");
}

function addTodo(e) {
    e.preventDefault();

    const inp = document.getElementById("ex1_ex");
    const inpMin = document.getElementById("ex1_min");
    const msg = document.getElementById("ex1_feedback");
    const msgTotal = document.getElementById("ex1_total");


    const text = inp.value.trim();
    const textMin = inpMin.value.trim();

    if (!text || !textMin) {
        msg.className = "alert alert-danger mb-3";
        msg.textContent = "❌ Vul een taak en tijd in";
        return;
    }

    oefening.push({ text, done: false });
    oefeningTime.push({ text, done: false });


    msg.className = "alert alert-success mb-3";
    msg.textContent = ` Taak toegevoegd: ${text}`;

    inp.value = "";
    renderTodos();
}

function handleTodoClick(e) {
    const idx = e.target.dataset.idx;

}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("ex1_btn")?.addEventListener("click", addTodo);
    document.getElementById("ex1_list")?.addEventListener("click", handleTodoClick);
});