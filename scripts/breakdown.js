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
function updateList() {
  let peopleInput = document.getElementById('people');
  let peopleList = peopleInput.value.split(/[,\s]+/);
  // Update dropdowns with the new peopleList
  updateDropdowns(peopleList);
  console.log(peopleList);
  return peopleList;
}

// Function to add a new row to the table
function addItem() {
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
  cell1.textContent = ''; // Empty first cell
  cell2.appendChild(createInput('text', 'itemName')); // Text input for Item Name
  cell3.appendChild(createInput('number', 'price')); // Text input for Price
  cell4.appendChild(createDropdown()); // Text input for Person
}

// Function to create an input element
function createInput(type, name) {
  let input = document.createElement('input');
  input.type = type;
  input.name = name;
  return input;
}

// Function to create a dropdown/select element
function createDropdown() {
  let select = document.createElement('select');
  // Options for the dropdown
  let options = updateList();

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