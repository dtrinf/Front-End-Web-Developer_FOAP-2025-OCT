
// Carga inicial de pokemones
/// - https://pokeapi.co/

/* ------------------------- */
/* Variables Section */
/* ------------------------- */

const pokemonURL = 'https://pokeapi.co/api/v2/pokemon';
// const totalPokemons = fetch(pokemonURL).then(res => {return res.json()}).then(data => {return data.count});
const totalPokemons = fetch(pokemonURL).then(res => res.json()).then(data => data.count);
const pokemonsToFetch = 10;
const usedPokemonIds = new Set();

const template = document.querySelector('#combat-card-template');

const delay = ms => new Promise(res => setTimeout(res, ms));

const resetButton = document.querySelector('#reset-battle-button');


let battleOpponents = {};

/* ------------------------- */
/* Functions Section */
/* ------------------------- */


fetchPokemons(pokemonsToFetch);

async function fetchPokemons(totalPokemons) {
    for (let i = 0; i < totalPokemons; i++) {
        let pokemonId = Math.floor(Math.random() * totalPokemons) + 1;
        while (usedPokemonIds.has(pokemonId)) {
            pokemonId = Math.floor(Math.random() * totalPokemons) + 1;
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
    const pokeContainer = document.querySelector('.available-cards-container');

    const pokeName = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const pokeImg = pokemon.sprites.front_default;

    const newPokemon = template.content.cloneNode(true);
    const card = newPokemon.querySelector('.flip-combat-card');
    
    const frontDiv = newPokemon.querySelector('.combat-card-front');
    frontDiv.querySelector('.pokemon-name').textContent = pokeName;
    frontDiv.querySelector('.pokemon-image').src = pokeImg;

    // Populate detailed info in combat-card-back div inside newPokemon
    const backDiv = newPokemon.querySelector('.combat-card-back');
    backDiv.querySelector('.pokemon-name').textContent = pokeName;
    backDiv.querySelector('.pokemon-image').src = pokeImg;
    backDiv.appendChild(document.createElement('a')).textContent = `Type: ${pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}`;
    backDiv.appendChild(document.createElement('a')).textContent = `Height: ${pokemon.height}`;
    backDiv.appendChild(document.createElement('a')).textContent = `Weight: ${pokemon.weight}`;
    backDiv.appendChild(document.createElement('a')).textContent = `Attack: ${pokemon.stats.find(stat => stat.stat.name === 'attack').base_stat}`;
    backDiv.appendChild(document.createElement('a')).textContent = `Defense: ${pokemon.stats.find(stat => stat.stat.name === 'defense').base_stat}`;
    backDiv.appendChild(document.createElement('a')).textContent = `HP: ${pokemon.stats.find(stat => stat.stat.name === 'hp').base_stat}`;
    backDiv.appendChild(document.createElement('a')).textContent = `Abilities: ${pokemon.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ')}`;
    

    // Add click event to toggle flip
    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
        addPokemonToBattle(card, pokemon);
    });

    pokeContainer.appendChild(newPokemon);
}

async function addPokemonToBattle(card, pokemon) {
    if (!battleOpponents['attacker']) {
        battleOpponents['attacker'] = {'card': card, 'pokemon': pokemon};
    } else if (!battleOpponents['defender']) {
        battleOpponents['defender'] = {'card': card, 'pokemon': pokemon};
        await delay(1000);
        fight();
    } else {
        console.log('Both battle slots are already filled.');
        card.classList.remove('flipped'); // Unflip the card if both slots are filled
    }
}

function fight() {
    console.log('Battle between:', battleOpponents['attacker']['pokemon'].name, 'and',
         battleOpponents['defender']['pokemon'].name);
    // Implement battle logic here
    if (battleOpponents['attacker']['pokemon'].stats.find(stat => stat.stat.name === 'attack').base_stat >
        battleOpponents['defender']['pokemon'].stats.find(stat => stat.stat.name === 'defense').base_stat) {
        console.log(battleOpponents['attacker']['pokemon'].name, 'wins!');
        battleOpponents['attacker']['card'].classList.add('winner');
        battleOpponents['defender']['card'].classList.add('loser');
    } else {
        console.log(battleOpponents['defender']['pokemon'].name, 'wins!');
        battleOpponents['defender']['card'].classList.add('winner');
        battleOpponents['attacker']['card'].classList.add('loser');
    }
    
}

resetButton.addEventListener('click', () => {
    updateBattleUI();
});

function updateBattleUI() {
    if (battleOpponents['attacker']) {
        battleOpponents['attacker']['card'].classList.remove('flipped');
        battleOpponents['attacker']['card'].classList.remove('winner');
        battleOpponents['attacker']['card'].classList.remove('loser');
    }
    if (battleOpponents['defender']) {
        battleOpponents['defender']['card'].classList.remove('flipped');
        battleOpponents['defender']['card'].classList.remove('winner');
        battleOpponents['defender']['card'].classList.remove('loser');
    }
    battleOpponents = {};
}