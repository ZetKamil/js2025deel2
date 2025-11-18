// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap’s JS
import * as bootstrap from 'bootstrap'

//eigen js

// ----------------------------------
 //Oefening bundel: M12
// ----------------------------------
class Persoon {
    constructor(name, age) {
        this.name = name;
        this.age = age;

    }
    info() {
        return `${this.name} (${this.age} jaar) `;
    }
}
class Employee {
    constructor(name, age, departament) {
        this.name = name;
        this.age = age;
        this.departament = departament;

    }
    info() {
        return `${this.name} (${this.age} jaar) Departament: ${this.departament}`;
    }
}
class Manager extends Employee {
    constructor(name, age, departament, team) {
        super(name, age, departament);
        this.role = "Manager";
        this.team = `${team}`;
    }
    info() {
        return `[MANAGER] ${super.info()}. Jouw team ${this.team} mensen.`;
    }
}
const exEmployee = [];
function addClassEmployee() {
    const name = document.getElementById("ex2_name").value.trim();
    const departament = document.getElementById("ex2_dep").value.trim();
    const age = Number(document.getElementById("ex2_age").value);
    const team = Number(document.getElementById("ex2_team").value);
    const role = document.getElementById("ex2_type").value;
    const list = document.getElementById("ex2_list");
    const feedback = document.getElementById("ex2_feedback")

    if (!name || !age|| !departament) return;
    const employee = role === "manager"
        ? new Manager(name, age, departament, team)
        : new Employee(name, age, departament);

    exEmployee.push(employee);
    feedback.textContent = "Togevoegd"
    feedback.className = "alert alert-info"

    list.innerHTML = exEmployee
        .map(u => `<li class="list-group-item">${u.info()}</li>`)
        .join("");
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("ex2_btn")
        ?.addEventListener("click", addClassEmployee);
});