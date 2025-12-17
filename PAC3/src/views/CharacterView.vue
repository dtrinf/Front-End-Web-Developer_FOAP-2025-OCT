<script setup>
import { ref, onMounted } from 'vue' //https://vuejs.org/guide/essentials/lifecycle
import FullCard from '@/components/FullCard.vue'

import { getPokemon } from '@/services/services.js'

// Retrieve a list of cards from the API
const card = ref(null)

const charId = defineProps(['charId'])

onMounted(async () => {
  card.value = await getPokemon(charId.charId);
});


</script>

<template>
  <h1>This is a Card page</h1>
  <h2>Character ID: {{ charId.charId || 'Loading...' }}</h2>

  <div>
    <section class="card" v-if="card">
      <FullCard :info="card" />
    </section>
  </div>
</template>

<style scoped>
.cards {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
}
</style>
