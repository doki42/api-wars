async function main(){
    let url = 'https://swapi.dev/api/planets/';
    planets(url, buildTable);
    planets(url, setNextButton);

    const nextButton = document.getElementById('next');
    const prevButton = document.getElementById('previous');
    const residentsModal = document.getElementById('residentsModal');

    nextButton.addEventListener('click', function(){
        url = nextButton.dataset.url;
        planets(url, buildTable);
        planets(url, setNextButton);
        planets(url, setPrevButton);
    });

    prevButton.addEventListener('click', function (){
        url = prevButton.dataset.url;
        planets(url, buildTable);
        planets(url, setPrevButton);
        planets(url, setNextButton);
    });

    residentsModal.addEventListener('show.bs.modal', event => {
        const residents = event.relatedTarget.getAttribute('data-bs-residents');
        const planetName = event.relatedTarget.getAttribute('data-bs-planet');
        const residentsArr = residents.split(',');
        const residentsModalTitle = residentsModal.querySelector('.modal-title')
        residentsModalTitle.innerText = `Residents of ${planetName}`;
        console.log(residentsArr)
        showResidents(residentsArr);
    });

}

async function planets(url, callback){
    let response = await fetch(url);
    const data = await response.json();
    callback(data)

    return data
}

function setNextButton(link)
{
    const nextButton = document.getElementById('next');
    nextButton.dataset.url = link.next;

}

function setPrevButton(link)
{
    const prevButton = document.getElementById('previous');
    prevButton.dataset.url = link.previous;

}

function clearTable() {
  const tableBody = document.querySelector('#table-body');
  while (tableBody.firstChild) tableBody.removeChild(tableBody.firstChild);
}

function buildTable(planets) {
  // Clear out the table body first.
  clearTable();

  // Add the table content.
  planets.results.forEach(function(curr) {
    addLineToHTMLTable(curr.name, curr.diameter, curr.climate, curr.terrain, curr.surface_water, curr.population, curr.residents);
    });
}

// Add a line to the HTML table
function addLineToHTMLTable(name, diameter, climate, terrain, surface_water, population, residents) {
  // Get the body of the table using the selector API
  const tableBody = document.querySelector("#table-body");

  // Add a new row at the end of the table
  const newRow = tableBody.insertRow();

  // add  new cells to the row
  const planetNameCell = newRow.insertCell();
  planetNameCell.innerHTML = name;

    const diameterCell = newRow.insertCell();
    diameterCell.innerHTML = (diameter == "unknown") ? "unknown" : `${diameter.toLocaleString()} km`;

    const climateCell = newRow.insertCell();
    climateCell.innerHTML = climate;

    const terrainCell = newRow.insertCell();
    terrainCell.innerHTML = terrain;

    const surfaceCell = newRow.insertCell();
    surfaceCell.innerHTML = (surface_water === "unknown") ? "unknown" : `${surface_water}%`;

    const peopleCell = newRow.insertCell();
    peopleCell.innerHTML = (population === "unknown") ? "unknown" : `${(population.toLocaleString())} people`;

    const residentsCell = newRow.insertCell();
    residentsCell.innerHTML = (residents.length == 0) ? "No known residents" : createResidentsButton(residents, name);

    const voteCell = newRow.insertCell();
    voteCell.innerHTML = '<button>Vote</button>';

}

function showResidents(residents)
{
    const tableBody = document.querySelector('#residentsTbody');
    while (tableBody.firstChild) tableBody.removeChild(tableBody.firstChild);
    for (let resident of residents){
        planets(resident, buildModalTable)
    }
    function buildModalTable(people){

    addLineToModalTable(people.name, people.height, people.mass, people.hair_color, people.skin_color, people.eye_color, people.birth_year, people.gender)

    }

    function addLineToModalTable(name, height, mass, hair, skin, eye, birth, gender) {
      // Get the body of the table using the selector API
      const tableBody = document.querySelector("#residentsTbody");

      // Add a new row at the end of the table
      const newRow = tableBody.insertRow();

      // add  new cells to the row
      const peopleNameCell = newRow.insertCell();
      peopleNameCell.innerHTML = name;

      const heightCell = newRow.insertCell();
      heightCell.innerHTML = (height == "unknown") ? "unknown" : height;

        const massCell = newRow.insertCell();
        massCell.innerHTML = mass;

        const hairCell = newRow.insertCell();
        hairCell.innerHTML = hair;

        const skinCell = newRow.insertCell();
        skinCell.innerHTML = skin;

        const eyeCell = newRow.insertCell();
        eyeCell.innerHTML = eye;

        const birthCell = newRow.insertCell();
        birthCell.innerHTML = birth;

        const genderCell = newRow.insertCell();
        genderCell.innerHTML = gender;

    }

}

function createResidentsButton(residents, planet)
{
    const residentsModal = new bootstrap.Modal ('#residentsModal');
    return `<button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#residentsModal" 
               data-bs-residents="${residents}" data-bs-planet="${planet}" name="residents">${residents.length} resident(s)</button>`
}



main();

