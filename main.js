const POKEMON_COUNT = 150;
const API_URL = 'https://pokeapi.co/api/v2/pokemon';

const container = document.getElementById('pokemon-container');
const searchInput = document.getElementById('search');
const loading = document.getElementById('loading');

let allPokemon = [];

const typeColors = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  grass: '#78C850',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC'
};

async function fetchPokemon(id) {
  const response = await fetch(`${API_URL}/${id}`);
  const data = await response.json();
  return data;
}

async function fetchAllPokemon() {
  loading.style.display = 'block';
  container.innerHTML = '';

  const promises = [];
  for (let i = 1; i <= POKEMON_COUNT; i++) {
    promises.push(fetchPokemon(i));
  }

  allPokemon = await Promise.all(promises);
  loading.style.display = 'none';
  renderPokemon(allPokemon);
}

function createPokemonCard(pokemon) {
  const types = pokemon.types.map(t => t.type.name);
  const mainType = types[0];
  const color = typeColors[mainType] || '#777';

  const card = document.createElement('div');
  card.className = 'pokemon-card';
  card.style.background = `linear-gradient(135deg, ${color} 0%, ${color}88 100%)`;

  const id = String(pokemon.id).padStart(3, '0');
  const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  const sprite = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;

  card.innerHTML = `
    <span class="pokemon-id">#${id}</span>
    <img src="${sprite}" alt="${name}" class="pokemon-img">
    <h3 class="pokemon-name">${name}</h3>
    <div class="pokemon-types">
      ${types.map(type => `<span class="type ${type}">${type}</span>`).join('')}
    </div>
    <div class="pokemon-stats">
      <div class="stat">
        <span class="stat-label">HP</span>
        <span class="stat-value">${pokemon.stats[0].base_stat}</span>
      </div>
      <div class="stat">
        <span class="stat-label">ATK</span>
        <span class="stat-value">${pokemon.stats[1].base_stat}</span>
      </div>
      <div class="stat">
        <span class="stat-label">DEF</span>
        <span class="stat-value">${pokemon.stats[2].base_stat}</span>
      </div>
    </div>
  `;

  return card;
}

function renderPokemon(pokemonList) {
  container.innerHTML = '';
  pokemonList.forEach(pokemon => {
    const card = createPokemonCard(pokemon);
    container.appendChild(card);
  });

  if (pokemonList.length === 0) {
    container.innerHTML = '<p class="no-results">No Pokemon found</p>';
  }
}

function filterPokemon(query) {
  const filtered = allPokemon.filter(pokemon => {
    const nameMatch = pokemon.name.toLowerCase().includes(query.toLowerCase());
    const idMatch = String(pokemon.id).includes(query);
    const typeMatch = pokemon.types.some(t =>
      t.type.name.toLowerCase().includes(query.toLowerCase())
    );
    return nameMatch || idMatch || typeMatch;
  });
  renderPokemon(filtered);
}

searchInput.addEventListener('input', (e) => {
  filterPokemon(e.target.value);
});

fetchAllPokemon();
