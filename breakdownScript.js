function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] === variable) {
          return pair[1];
      }
  }
  return false;
}
var breakdown = getQueryVariable("type");
var state = getQueryVariable("state");
var breakdownSpan = document.getElementById("breakdown");
var stateSpan = document.getElementById("state");
breakdownSpan.textContent = breakdown;
stateSpan.textContent = state;