<script setup>
import { ref, onMounted } from 'vue' //https://vuejs.org/guide/essentials/lifecycle
import Card from '@/components/Card.vue'

import { getTotalCharacters, getCards, pokemonsToFetch } from '@/services/services.js'

// Retrieve total characters from the API
const totalCharacters = ref(null)
onMounted(async () => {
  totalCharacters.value = await getTotalCharacters()
})

// Retrieve a list of cards from the API
const cards = ref([])

onMounted(async () => {
  cards.value = await getCards(pokemonsToFetch);
});

</script>

<template>
  <h1>This is a Cards page</h1>
  <h2>Total Characters: {{ totalCharacters || 'Loading...' }}</h2>

  <div>
    <section class="cards" v-if="cards">
      <Card v-for="card in cards" :key="card.id" :info="card">' </Card>
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
