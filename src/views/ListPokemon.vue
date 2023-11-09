<script setup>
import { ref } from 'vue'
import CardPokemon from '@/components/CardPokemon.vue'

const pokemonList = ref([])

fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
    .then(response => response.json())
    .then(data => {
        pokemonList.value = data.results.map(pokemon => pokemon.name)
    })
    .catch(error => console.log(error))

</script>

<template>
    <section>
        <input type="text" id="search" placeholder="Search for a pokemon"><button id="search_btn">Search</button>
        <div class="grid_poke" id="grid_poke">
            <CardPokemon v-for="pokemon in pokemonList" :key="pokemon" :name="pokemon" />
        </div>
    </section>
</template>

<style scoped>
.grid_poke {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-gap: 1rem;
}
</style>