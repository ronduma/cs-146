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

// Function to toggle visibility of the people list input
function togglePeopleList() {
  const peopleInputContainer = document.querySelector('.container.peopleList');
  if (peopleInputContainer.style.display === 'none' || peopleInputContainer.style.display === '') {
    peopleInputContainer.style.display = 'block';
  } else {
    peopleInputContainer.style.display = 'none';
  }
}

// Function to handle adding a person
function getPeople() {
  let peopleInput = document.getElementById('people');
  let peopleList = peopleInput.value.split(/[,\s]+/);
  // Update dropdowns with the new peopleList
  updateDropdowns(peopleList);
  // loopTable(); 
  return peopleList;
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
  return tipInput.value ? tipInput.value : 0;
}

let itemCount = 0;

// Function to add a new row to the table
function addItem() {
  itemCount++;

  // Get the reference to the table
  let table = document.querySelector('table');

  // Create a new row and cells
  let newRow = table.insertRow();

  // Insert cells into the new row
  let cell1 = newRow.insertCell(0); // Leave the first cell empty if needed
  let cell2 = newRow.insertCell(1);
  let cell3 = newRow.insertCell(2);
  let cell4 = newRow.insertCell(3);

  // Set content for the cells (you can replace these with your actual values)
  let deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', function() {
    let row = this.parentNode.parentNode; // Get the parent row of the clicked button
    row.parentNode.removeChild(row); // Remove the row
  });
  cell1.appendChild(deleteButton); // Append the button to the cell
  cell2.appendChild(createInput('text', 'itemName', itemCount)); // Text input for Item Name
  cell3.appendChild(createInput('number', 'price', itemCount)); // Text input for Price
  cell4.appendChild(createDropdown('dropdown', itemCount)); // Text input for Person
}

// Function to create an input element
function createInput(type, name, id) {
  let input = document.createElement('input');
  input.type = type;
  input.name = name;
  input.id = name + id;
  return input;
}

// Function to create a dropdown/select element
function createDropdown(name, id) {
  let select = document.createElement('select');
  select.id = name;
  select.id = name + id;
  // Options for the dropdown
  let options = getPeople();

  // Loop through options and create option elements
  options.forEach(function(option) {
    let opt = document.createElement('option');
    opt.value = option;
    opt.text = option;
    select.appendChild(opt);
  });

  return select;
}

// Function to update the dropdowns in all cell4s
function updateDropdowns(peopleList) {
  let allDropdowns = document.querySelectorAll('select'); // Get all dropdowns in the table

  allDropdowns.forEach(function(dropdown) {
    dropdown.innerHTML = ''; // Clear existing options

    // Loop through the updated peopleList and create option elements
    peopleList.forEach(function(option) {
      let opt = document.createElement('option');
      opt.value = option;
      opt.text = option;
      dropdown.appendChild(opt);
    });
  });
}

function loopTable(){
  let values = [];
  let table = document.getElementById('table');
  let rows = table.getElementsByTagName('tr');

  // Iterate through each row (skipping the first row which contains headers)
  for (let i = 1; i < rows.length; i++) {
    let cells = rows[i].getElementsByTagName('td');
    // Iterate through each cell in the row
    let val = {
      "itemName" : cells[1].querySelector('input').value,
      "price" : parseFloat(cells[2].querySelector('input').value),
      "person" : cells[3].querySelector('select').value
    };
    values.push(val)
  }
  return values;
}

function byMeal(){
  let values = loopTable();
  let tip = getTip();
  let personMap = {};
  let tax = getTaxRate(state);
  console.log("tax", tax)
  for (let i = 0; i < values.length; i++){
    if (!personMap[values[i].person]){
      personMap[values[i].person] = {};
      personMap[values[i].person].price = values[i].price;
    } else{
      personMap[values[i].person].price += values[i].price;
    }
  }

  for (let person in personMap) {
    personMap[person].price *= getTaxRate(state)
    personMap[person].price += parseFloat(tip) / parseFloat(Object.keys(personMap).length)
    personMap[person].price = personMap[person].price.toFixed(2);
  }
  console.log(personMap)
  localStorage.setItem('personMap', JSON.stringify(personMap));
  localStorage.setItem('splitType', 'By Meal');
  window.location.href = './result.html';
}

document.getElementById('addPersonBtn').addEventListener('click', togglePeopleList);
document.getElementById('addItemBtn').addEventListener('click', addItem);
document.getElementById('addTipBtn').addEventListener('click', toggleTip);
document.getElementById('submitBtn').addEventListener('click', byMeal);
document.getElementById('savePeopleBtn').addEventListener('click', getPeople);
document.getElementById('saveTipBtn').addEventListener('click', getTip);