<script setup>
import { ref } from 'vue'
import card from './components/card.vue'

const pokemonList = ref([])

fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
  .then(response => response.json())
  .then(data => {
    pokemonList.value = data.results.map(pokemon => pokemon.name)
  })
  .catch(error => console.log(error))

</script>

<template>
  <div class="grid_poke" id="grid_poke">
    <card v-for="pokemon in pokemonList" :key="pokemon" :name="pokemon"></card>
  </div>
</template>

<style>
.grid_poke {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 1rem;
}
</style>