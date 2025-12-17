<script setup>
import router from '@/router';

const props = defineProps(['info'])
</script>

<template>
  <div class="card">
    <div class="card-image">
      <img :src="props.info.sprites.front_default" :alt="props.info.name" />
    </div>
    <div class="card-details">
      <h2>
        {{ props.info.name[0].toUpperCase() + props.info.name.slice(1) }}
      </h2>
      <h4>Attack: {{ props.info.stats.find(stat => stat.stat.name === 'attack').base_stat }}</h4>
      <h4>Defense: {{ props.info.stats.find(stat => stat.stat.name === 'defense').base_stat }}</h4>
      <button @click="router.push({ name: 'character', params: { charId: props.info?.id } })">Show Full Card</button>
    </div>
  </div>
</template>

<style scoped>
.card {
  height: 350px;
  width: 200px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card img {
  width: 100%;
  height: auto;
  border-radius: 4px;
  margin-top: 8px;
}

.card:hover img {
  transform: scale(1.5);
  transition: transform 0.3s ease;
  filter: drop-shadow(2px 4px 6px yellow);
}

.card button {
  align-items: center;
}

.card button {
  margin-top: 16px;
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  align-self: center;
}
</style>
