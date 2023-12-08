const usStates = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Washington D.C.", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
];

// Function to populate the states dropdown
function populateStatesDropdown() {
const statesDropdown = document.getElementById("state");
usStates.forEach(function(state) {
  const option = document.createElement("option");
  option.value = state;
  option.text = state;
  statesDropdown.appendChild(option);
});
}

// Call the function to populate the states dropdown
populateStatesDropdown();

function prepareDataAndSubmit() {
  const selectedType = document.getElementById("type").value;
  const selectedState = document.getElementById("state").value;

  console.log(selectedType, selectedState)

  // Submit the form
  document.querySelector('form').submit();
}