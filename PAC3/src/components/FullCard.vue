<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
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
      <p><strong>Type:</strong> {{ props.info.types.map(typeInfo => typeInfo.type.name).join(', ') }}</p>
      <p><strong>Height:</strong> {{ props.info.height }} | <strong>Weight:</strong> {{ props.info.weight }}</p>
      <p><strong>HP:</strong> {{ props.info.stats.find(stat => stat.stat.name === 'hp').base_stat }}</p>
      <p><strong>Attack:</strong> {{ props.info.stats.find(stat => stat.stat.name === 'attack').base_stat }}</p>
      <p><strong>Defense:</strong> {{ props.info.stats.find(stat => stat.stat.name === 'defense').base_stat }}</p>
      <p><strong>Abilities:</strong> {{ props.info.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ') }}</p>
    </div>
  </div>
   <button @click="router.push({ name: 'home' })">
    Back to Cards
  </button>
</template>

<style scoped>
.card {
  min-height: 400px;
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  background-color: white;
}

.card-image {
  text-align: center;
  margin-bottom: 16px;
}

.card-image img {
  width: 150px;
  height: 150px;
  object-fit: contain;
  border-radius: 4px;
  transition: transform 0.3s ease;
}

.card:hover .card-image img {
  transform: scale(1.5);
  filter: drop-shadow(2px 4px 6px yellow);
}

.card-details h2 {
  margin: 0 0 12px 0;
  color: #333;
  text-align: center;
  text-transform: capitalize;
}

.card-details p {
  margin: 8px 0;
  font-size: 0.9rem;
  line-height: 1.4;
  color: #555;
}

.card-details strong {
  color: #333;
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
