// The array of cities from which we pull data 
// We fetch the data, then filter it to a sub-set where either the city or the state name matches
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

// Returns a promise - will eventually return something
// We call .then against it - returns a blob of data
// So at first it doesn't really know what type of data we're dealing with 
// Thus the blob needs to be converted into JSON
fetch(endpoint)
  .then(blob => blob.json()) // blob.json also returns a promise
  .then(data => cities.push(...data)) // This returns the array of cities finally + spreads it into the push method

// Partitions the number of population using commas  
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function findMatches(wordToMatch, cities) {
  return cities.filter(place => {
    // To figure out if the city/state matches the query
    const regex = new RegExp(wordToMatch, 'gi') // Global + case insensitive
    return place.city.match(regex) || place.state.match(regex) // Checks if city OR state has a match
  });
}

// Will be called whenever the user changes the input value
function displayMatches() {
  const matchArray = findMatches(this.value, cities);
  const html = matchArray.map(place => {
    const regex = new RegExp(this.value, 'gi');
    const cityName = place.city
      // Finds where the query matched with suggestions and highlights it
      .replace(regex,
        `<span class="hl">${this.value}</span>`);
    const stateName = place.state
      // Finds where the query matched with suggestions and highlights it
      .replace(regex,
        `<span class="hl">${this.value}</span>`);
    return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class= "population">${numberWithCommas(place.population)}</span>
      </li>  
    `;
  }).join(''); // Turns it into a string
  suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search')
const suggestions = document.querySelector('.suggestions')

// Change event: need to click outside of the input box to trigger it
searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);