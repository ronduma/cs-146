document.addEventListener('DOMContentLoaded', function() {
    let form = document.querySelector('form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        let splitType = document.getElementById('types').value;
        let selectedState = document.getElementById('states').value;

        window.location.href = 'breakdown.html?type=' + splitType + '&state=' + selectedState;
    });
});


const statesDropdown = document.getElementById('states');

const states = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida",
    "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine",
    "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska",
    "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
    "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas",
    "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
];

states.forEach(state => {
    const option = document.createElement('option');
    option.value = state;
    option.text = state;
    statesDropdown.appendChild(option);
});