<script setup>
import router from '@/router';

import { addFlipCardToggle } from '@/services/services';

const props = defineProps(['info'])
</script>

<template id="combat-card-template">
    <!-- <div class="flip-combat-card" @click=" $event.currentTarget.classList.toggle('flipped') "> -->
    <div class="flip-combat-card" @click="addFlipCardToggle($event.currentTarget, props.info)">
        <div class="combat-card-inner">
            <div class="combat-card-front">
                <img class="pokemon-image-hidden" :src="props.info.sprites.front_default" alt="Pokemon">
                <h3 class="pokemon-name">Unknown</h3>
            </div>
            <div class="combat-card-back">
              <img class="pokemon-image" :src="props.info.sprites.front_default" :alt="props.info.name">
              <h2>
                {{ props.info.name[0].toUpperCase() + props.info.name.slice(1) }}
              </h2>
              <p><strong>Type:</strong> {{ props.info.types.map(typeInfo => typeInfo.type.name).join(', ') }}</p>
              <p><strong>Height:</strong> {{ props.info.height }} | <strong>Weight:</strong> {{ props.info.weight }}</p>
              <p><strong>HP:</strong> {{ props.info.stats.find(stat => stat.stat.name === 'hp').base_stat }}</p>
              <p><strong>Attack:</strong> {{ props.info.stats.find(stat => stat.stat.name === 'attack').base_stat }}</p>
              <p><strong>Defense:</strong> {{ props.info.stats.find(stat => stat.stat.name === 'defense').base_stat }}</p>
              <p><strong>Abilities:</strong> {{ props.info.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ') }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>

/* Combat stiles */
.available-cards-container {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap; /* Allows wrapping to new lines on smaller screens */
    gap: 20px;
}

.combat-card-front {
    display: flex;
    align-items: center;
    flex-direction: column;
    border-radius: 10px;
    padding: 10px;
    margin-bottom: 10px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.combat-card-front img {
    filter: blur(10px);
    width: 80px;
    height: 80px;
    margin-right: 20px;
}

.combat-card-front:hover img {
  transform: scale(1.5);
  transition: transform 0.3s ease;
  filter: blur(4px);
}



 /* The flip card container - set the width and height to whatever you want.
  We have added the border property to demonstrate that the flip itself goes out
  of the box on hover (remove perspective if you don't want the 3D effect */
.flip-combat-card {
  background-color: transparent;
  width: 215px;
  height: 340px;
  perspective: 1000px;
  margin: 10px;
}

/* This container is needed to position the front and back side */
.combat-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

/* Flip when card has flipped class */
.flip-combat-card.flipped .combat-card-inner {
  transform: rotateY(180deg);
}

/* Position the front and back side */
.combat-card-front, .combat-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Style the front side (fallback if image is missing) */
.combat-card-front {
  background-color: #f8f8f8;
  color: black;
}

/* Style the back side */
.combat-card-back {
  background-color: dodgerblue;
  color: white;
  transform: rotateY(180deg);
  overflow-y: auto;
}

.combat-card-back .pokemon-stats {
  font-size: 12px;
  text-align: left;
  width: 100%;
}

.combat-card-back .pokemon-stats p {
  margin: 5px 0;
}

.winner .combat-card-back {
    background-color: #32CD32;
}

.loser .combat-card-back {
    background-color: #DC143C;
}
</style>
