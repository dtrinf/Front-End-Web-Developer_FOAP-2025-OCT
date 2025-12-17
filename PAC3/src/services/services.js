import axios from "axios";

const baseURL = 'https://pokeapi.co/api/v2/pokemon';

const usedPokemonIds = new Set();

export const pokemonsToFetch = 10;

export const getTotalCharacters = async () => {
  const response = await fetch(baseURL)
  const data = await response.json()
  console.log(data.count)
  return data.count
}

export async function getPokemon(id) {
    const url = `${baseURL}/${id}`;
    const res = await fetch(url);
    const pokemon = await res.json();
    return pokemon;
}

export const getCards = async (totalPokemons) => {
  usedPokemonIds.clear(); // Clear the set before fetching new cards
  let cards = [];
  for (let i = 0; i < totalPokemons; i++) {
      let pokemonId = Math.floor(Math.random() * totalPokemons) + 1;
      while (usedPokemonIds.has(pokemonId)) {
          pokemonId = Math.floor(Math.random() * totalPokemons) + 1;
      }
      usedPokemonIds.add(pokemonId);
      let pokemon = await getPokemon(pokemonId);
      cards.push(pokemon);
  }
  return cards;
}


// Combat functions
const delay = ms => new Promise(res => setTimeout(res, ms));
let battleOpponents = {};

export function addFlipCardToggle(card, pokemon) {
  let flipped = card.classList.toggle('flipped');
  if (flipped) {
    console.log('Adding to battle:', pokemon.name);
    addPokemonToBattle(card, pokemon);
  } else {
    console.log('Removing from battle:', pokemon.name);
    card.classList.remove('winner', 'loser');
    removePokemonFromBattle(card, pokemon);
  }
}


async function addPokemonToBattle(card, pokemon) {
    if (!battleOpponents['attacker']) {
        battleOpponents['attacker'] = {'card': card, 'pokemon': pokemon};
    } else if (!battleOpponents['defender']) {
        battleOpponents['defender'] = {'card': card, 'pokemon': pokemon};
    } else {
        console.log('Both battle slots are already filled.');
        card.classList.remove('flipped'); // Unflip the card if both slots are filled
    }

    if (battleOpponents['attacker'] && battleOpponents['defender']) {
        console.log('Both slots filled, initiating fight...');
        await delay(1000);
        fight();
    }
}

function removePokemonFromBattle(card, pokemon) {
    if (battleOpponents['attacker'] && battleOpponents['attacker']['pokemon'].name === pokemon.name) {
        delete battleOpponents['attacker'];
    } else if (battleOpponents['defender'] && battleOpponents['defender']['pokemon'].name === pokemon.name) {
        delete battleOpponents['defender'];
    }
}

function fight() {
    console.log('Battle between:', battleOpponents['attacker']['pokemon'].name, 'and',
         battleOpponents['defender']['pokemon'].name);
    // Implement battle logic here
    if (battleOpponents['attacker']['pokemon'].stats.find(stat => stat.stat.name === 'attack').base_stat >
        battleOpponents['defender']['pokemon'].stats.find(stat => stat.stat.name === 'defense').base_stat) {
        console.log(battleOpponents['attacker']['pokemon'].name, 'wins!');
        battleOpponents['attacker']['card'].classList.remove('loser');
        battleOpponents['attacker']['card'].classList.add('winner');
        battleOpponents['defender']['card'].classList.remove('winner');
        battleOpponents['defender']['card'].classList.add('loser');
    } else {
        console.log(battleOpponents['defender']['pokemon'].name, 'wins!');
        battleOpponents['defender']['card'].classList.remove('loser');
        battleOpponents['defender']['card'].classList.add('winner');
        battleOpponents['attacker']['card'].classList.remove('winner');
        battleOpponents['attacker']['card'].classList.add('loser');
    }

}
