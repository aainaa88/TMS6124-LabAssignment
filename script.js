let data;

window.onload = function () {
  fetch('attractions.xml')
    .then(response => response.text())
    .then(xml => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xml, "application/xml");
      data = Array.from(xmlDoc.getElementsByTagName("Attraction"));
      showAll();
    });
};

function showAll() {
  const container = document.getElementById("attractions");
  container.innerHTML = "<h2>All Attractions</h2>";
  data.forEach(displayAttraction);
}

function groupBy(tag) {
  const container = document.getElementById("attractions");
  container.innerHTML = `<h2>Grouped by ${tag}</h2>`;
  const groups = {};
  data.forEach(attraction => {
    const key = attraction.getElementsByTagName(tag)[0].textContent;
    if (!groups[key]) groups[key] = [];
    groups[key].push(attraction);
  });

  for (let group in groups) {
    container.innerHTML += `<h3>${group}</h3>`;
    groups[group].forEach(displayAttraction);
  }
}

function displayAttraction(attraction) {
  const id = attraction.getElementsByTagName("PlaceID")[0].textContent;
  const name = attraction.getElementsByTagName("Name")[0].textContent;
  const city = attraction.getElementsByTagName("City")[0].textContent;
  const state = attraction.getElementsByTagName("State")[0].textContent;
  const desc = attraction.getElementsByTagName("Description")[0].textContent;
  const hours = attraction.getElementsByTagName("OpeningHours")[0].textContent;
  const category = attraction.getElementsByTagName("Category")[0].textContent;
  const ticket = attraction.getElementsByTagName("Ticket")[0].textContent;
  const price = attraction.getElementsByTagName("Price")[0].textContent;
  const image = attraction.getElementsByTagName("Image")[0].textContent;

  const container = document.getElementById("attractions");
  container.innerHTML += `
    <div class="card">
      <h4>${id} - ${name}</h4>
      <p><strong>City:</strong> ${city}</p>
      <p><strong>State:</strong> ${state}</p>
      <p><strong>Description:</strong> ${desc}</p>
      <p><strong>Opening Hours:</strong> ${hours}</p>
      <p><strong>Category:</strong> ${category}</p>
      <p><strong>Ticket Required:</strong> ${ticket}</p>
      <p><strong>Price:</strong> RM ${price}</p>
      <img src="${image}" alt="${name}" style="max-width:100%;height:auto;">
    </div>
  `;
}
