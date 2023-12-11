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