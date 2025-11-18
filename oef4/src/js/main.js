// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap’s JS
import * as bootstrap from 'bootstrap'

//eigen js


//  import van modules
import User from './userModel.js';
// benoemde import voor de functie
import { createUserCard } from './userCard.js';

const users = [];

//  DOM

function updateStatus() {
    const statusElement = document.getElementById('ex4_status');

    if (users.length === 0) {
        statusElement.className = 'alert alert-secondary mb-3';
        statusElement.textContent = 'Nog geen gebruikers toegevoegd.';
    } else {
        statusElement.className = 'alert alert-success mb-3';
        statusElement.textContent = `${users.length} gebruiker(s) succesvol toegevoegd!`;
    }
}

function renderUserList() {
    const listElement = document.getElementById('ex4_list');

    const listHTML = users.map(function(user) {
        return createUserCard(user);
    }).join('');

    listElement.innerHTML = listHTML;
    updateStatus();
}

function addUser() {
    const nameInput = document.getElementById('ex4_name');
    const ageInput = document.getElementById('ex4_age');

    const name = nameInput.value.trim();
    const age = parseInt(ageInput.value);

    // validatie
    if (!name) {
        updateStatus('❌ Fout: Naam mag niet leeg zijn.', 'danger');
        return;
    }
    if (isNaN(age) || age <= 0) {
        updateStatus('❌ Fout: Leeftijd moet een positief getal zijn.', 'danger');
        return;
    }

    // nieuw User object
    const newUser = new User(name, age);

    users.push(newUser);
    renderUserList();

    
    nameInput.value = '';
    ageInput.value = '';
}

document.getElementById('ex4_btn').addEventListener('click', addUser);
updateStatus();