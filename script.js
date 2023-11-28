document.addEventListener('DOMContentLoaded', function() {
    let form = document.querySelector('form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        let splitType = document.getElementById('types').value;
        let selectedState = document.getElementById('states').value;

        window.location.href = 'breakdown.html?type=' + splitType + '&state=' + selectedState;
    });
});
