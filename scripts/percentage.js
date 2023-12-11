import { taxRates } from '../taxRates.js';

// Function to get URL parameters by name
function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  const results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Get the breakdown type and state from URL parameters
let breakdownType = getUrlParameter('type');

const state = getUrlParameter('state');

// Get the tax rate from the state

function getTaxRate(state){
  // Usage example
  const foundState = taxRates.find(item => item.state === state);
  if (foundState) {
    return 1 + foundState.tax_rate;
  } else {
    throw new Error('State not found.');
  }
}

// Update the spans with the retrieved values
document.getElementById('breakdown').innerText = breakdownType || 'null';
document.getElementById('state').innerText = state || 'null';

// Get the input field for people list
const peopleInput = document.getElementById('people');

let personCount = 0;
// Function to add a new row to the table
function addPerson() {
  personCount++;

  // Get the reference to the table
  let table = document.getElementById('peopleList');

  // Create a new row and cells
  let newRow = table.insertRow();

  // Insert cells into the new row
  let cell1 = newRow.insertCell(0); // Leave the first cell empty if needed
  let cell2 = newRow.insertCell(1);
  let cell3 = newRow.insertCell(2);

  // Set content for the cells (you can replace these with your actual values)
  cell1.textContent = ''; // Empty first cell
  cell2.appendChild(createInput('text', 'personName', personCount)); // Text input for Item Name
  cell3.appendChild(createInput('number', 'percentage', personCount)); // Text input for Price
}

// Function to toggle visibility of the people list input
function toggleTip() {
  const peopleInputContainer = document.querySelector('.container.addTip');
  if (peopleInputContainer.style.display === 'none' || peopleInputContainer.style.display === '') {
    peopleInputContainer.style.display = 'block';
  } else {
    peopleInputContainer.style.display = 'none';
  }
}

// Function to handle adding a person
function getTip() {
  let tipInput = document.getElementById('tip');
  return tipInput.value ? parseFloat(tipInput.value) : 0;
}

let itemCount = 0;

// Function to add a new row to the table
function addItem() {
  itemCount++;

  // Get the reference to the table
  let table = document.getElementById('table');

  // Create a new row and cells
  let newRow = table.insertRow();

  // Insert cells into the new row
  let cell1 = newRow.insertCell(0); // Leave the first cell empty if needed
  let cell2 = newRow.insertCell(1);
  let cell3 = newRow.insertCell(2);

  // Set content for the cells (you can replace these with your actual values)
  cell1.textContent = ''; // Empty first cell
  cell2.appendChild(createInput('text', 'itemName', itemCount)); // Text input for Item Name
  cell3.appendChild(createInput('number', 'price', itemCount)); // Text input for Price
}

// Function to create an input element
function createInput(type, name, id) {
  let input = document.createElement('input');
  input.type = type;
  input.name = name;
  input.id = name + id;
  return input;
}

function loopPeople(){
  let people = {};
  let table = document.getElementById('peopleList');
  let rows = table.getElementsByTagName('tr');

  // Iterate through each row (skipping the first row which contains headers)
  for (let i = 1; i < rows.length; i++) {
    let cells = rows[i].getElementsByTagName('td');
    people[cells[1].querySelector('input').value] = cells[2].querySelector('input').value;
  }
  return people
}

function loopTable(){
  let total = 0;
  let table = document.getElementById('table');
  let rows = table.getElementsByTagName('tr');

  // Iterate through each row (skipping the first row which contains headers)
  for (let i = 1; i < rows.length; i++) {
    let cells = rows[i].getElementsByTagName('td');
    // Iterate through each cell in the row
    total += parseFloat(cells[2].querySelector('input').value);
  }
  return total;
}

function percentage(){
  let total = loopTable();
  let tip = getTip();
  let tax = getTaxRate(state);
  let people = loopPeople();
  let percent = {};
  total *= tax;
  total += tip;
  total = total.toFixed(2);
  for (let person in people){
    percent[person] = (total * (people[person] / 100)).toFixed(2);
  }
  console.log(percent)
  localStorage.setItem('percent', JSON.stringify(percent));
  localStorage.setItem('splitType', "Percentage");
  window.location.href = './result.html';
}

document.getElementById('addPersonBtn').addEventListener('click', addPerson);
document.getElementById('addItemBtn').addEventListener('click', addItem);
document.getElementById('addTipBtn').addEventListener('click', toggleTip);
document.getElementById('submitBtn').addEventListener('click', percentage);
document.getElementById('saveTipBtn').addEventListener('click', getTip);