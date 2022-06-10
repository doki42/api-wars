async function main(){
    let url = 'https://swapi.dev/api/planets/';
    planets(url, buildTable);
    planets(url, setNextButton);

    const nextButton = document.getElementById('next');
    const prevButton = document.getElementById('previous');

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
        /*if (prevButton.dataset.url === "null"){
            prevButton.classList.add("disabled");
        } else {
            prevButton.classList.remove('disabled')
        }*/
    })

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
/*function getPlanetTable(pageNum) {
    swapiModule.getPlanets({page: pageNum}, function (data) {
        buildTable(data.results);
        console.log(data.next);
    });
}*/
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
    residentsCell.innerHTML = (residents.length == 0) ? "No known residents" : showResidents(residents);

    const voteCell = newRow.insertCell();
    voteCell.innerHTML = '<button>Vote</button>';
}

function showResidents(residents)
{
   return residents.length


}

main();

`${diameter.toLocaleString()} km`