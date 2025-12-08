// Carga inicial de pokemones
/// - https://pokeapi.co/

/* ------------------------- */
/* Variables */
/* ------------------------- */

const pokemonURL = 'https://pokeapi.co/api/v2/pokemon';
// const totalPokemons = fetch(pokemonURL).then(res => {return res.json()}).then(data => {return data.count});
const totalPokemons = fetch(pokemonURL).then(res => res.json()).then(data => data.count);
const pokemonsToFetch = 20;
const usedPokemonIds = new Set();

const template = document.querySelector('#card-template');

const filterInput = document.querySelector('.search-input');


/* ------------------------- */
/* Functions */
/* ------------------------- */

fetchPokemons(pokemonsToFetch);

async function fetchPokemons(totalPokemons) {
    for (let i = 0; i < totalPokemons; i++) {
        let pokemonId = Math.floor(Math.random() * totalPokemons) + 1;
        while (usedPokemonIds.has(pokemonId)) {
            pokemonId = Math.floor(Math.random() * totalPokemons) + 1;
            // console.log('Duplicate ID found, generating a new one:', pokemonId);
            // console.log(usedPokemonIds);
        }
        usedPokemonIds.add(pokemonId);
        let pokemon = await getPokemon(pokemonId);
        displayPokemon(pokemon);
    }
}

async function getPokemon(id) {
    const url = `${pokemonURL}/${id}`;
    // console.log(url);
    const res = await fetch(url);
    const pokemon = await res.json();
    return pokemon;
}

function displayPokemon(pokemon) {
    const pokeContainer = document.querySelector('.cards-container');

    const pokeName = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const pokeImg = pokemon.sprites.front_default;

    const newPokemon = template.content.cloneNode(true);
    const card = newPokemon.querySelector('.pokemon-card');
    
    card.querySelector('.pokemon-name').textContent = pokeName;
    card.querySelector('.pokemon-image').src = pokeImg;
    card.querySelector('.pokemon-type span').textContent = pokemon.types.map(typeInfo => typeInfo.type.name).join(', ');
    card.querySelector('.pokemon-height span').textContent = pokemon.height;
    card.querySelector('.pokemon-weight span').textContent = pokemon.weight;
    card.querySelector('.pokemon-attack span').textContent = pokemon.stats.find(stat => stat.stat.name === 'attack').base_stat;
    card.querySelector('.pokemon-defense span').textContent = pokemon.stats.find(stat => stat.stat.name === 'defense').base_stat;
    card.querySelector('.pokemon-hp span').textContent = pokemon.stats.find(stat => stat.stat.name === 'hp').base_stat;
    // Add click event listener to show detail
    card.addEventListener('mouseover', () => showPokemonDetail(pokemon));

    pokeContainer.appendChild(card);

}

function showPokemonDetail(pokemon) {
    const detailContainer = document.querySelector('.card-detail');
    
    const newPokemon = template.content.cloneNode(true);
    const card = newPokemon.querySelector('.pokemon-card');

    const pokeName = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const pokeImg = pokemon.sprites.front_default;
    card.querySelector('.pokemon-name').textContent = pokeName;
    card.querySelector('.pokemon-image').src = pokeImg;
    card.querySelector('.pokemon-type span').textContent = pokemon.types.map(typeInfo => typeInfo.type.name).join(', ');
    card.querySelector('.pokemon-height span').textContent = pokemon.height;
    card.querySelector('.pokemon-weight span').textContent = pokemon.weight;
    card.querySelector('.pokemon-attack span').textContent = pokemon.stats.find(stat => stat.stat.name === 'attack').base_stat;
    card.querySelector('.pokemon-defense span').textContent = pokemon.stats.find(stat => stat.stat.name === 'defense').base_stat;
    card.querySelector('.pokemon-hp span').textContent = pokemon.stats.find(stat => stat.stat.name === 'hp').base_stat;
    card.appendChild(document.createElement('p')).textContent = `Abilities: ${pokemon.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ')}`;

    detailContainer.innerHTML = card.innerHTML;
}


filterInput.addEventListener('input', () => {
    const filterValue = filterInput.value.toLowerCase();
    const allCards = Array.from(document.querySelectorAll('.pokemon-card'));

    allCards.forEach(card => {
        const pokemonName = card.querySelector('.pokemon-name').textContent.toLowerCase();
        if (pokemonName.includes(filterValue)) {
            card.style.display = 'flex'; // or '' para restaurar al valor por defecto
        } else {
            card.style.display = 'none'; // Ocultar la tarjeta
        }
    });
});