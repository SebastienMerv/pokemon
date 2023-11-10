<script setup>
import { useRoute, useRouter } from 'vue-router';
</script>

<template>
    <section>
        <h1>Welcome to</h1>
        <h2>Pokemon - Pokédex</h2>
        <p>By Sébastien Merveille</p>
        <RouterLink :to="{ name: PokemonList }">Naviguate between the pokemon</RouterLink>
    </section>
</template>

<style scoped>
section {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}
</style>