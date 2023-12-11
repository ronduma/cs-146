
let splitType = localStorage.getItem('splitType')

if (splitType == 'Even'){
  let total = localStorage.getItem('total');
  let resultContainer = document.getElementById('result');
  let div = document.createElement('div');
  let span = document.createElement('span');

  div.textContent = `Each person owes: `;
  span.textContent = `$${total}`;

  span.style.fontWeight = 'bold'; // Optional styling for the owed amount

  div.appendChild(span);
  resultContainer.appendChild(div);
}

if (splitType == 'By Meal'){
  let personMap = JSON.parse(localStorage.getItem('personMap'));
  console.log(personMap)
  let resultContainer = document.getElementById('result');
  for (let person in personMap) {
    let div = document.createElement('div');
    let span = document.createElement('span');

    div.textContent = `${person} owes: `;
    span.textContent = `$${personMap[person].price}`;

    span.style.fontWeight = 'bold'; // Optional styling for the owed amount

    div.appendChild(span);
    resultContainer.appendChild(div);
  }
}

if (splitType == 'Percentage'){
  let personMap = JSON.parse(localStorage.getItem('percent'));
  console.log(personMap)
  let resultContainer = document.getElementById('result');
  for (let person in personMap) {
    let div = document.createElement('div');
    let span = document.createElement('span');

    div.textContent = `${person} owes: `;
    span.textContent = `$${personMap[person]}`;

    span.style.fontWeight = 'bold'; // Optional styling for the owed amount

    div.appendChild(span);
    resultContainer.appendChild(div);
  }
}