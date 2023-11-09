<script setup>
import { useRoute, useRouter } from 'vue-router';

</script>

<template>
    <section>
        <p>
            The pokemon you were looking for was not found!<br>
            You can always continue your search <RouterLink :to="{ name: Home }">here</RouterLink>
        </p>
    </section>
</template>

<style scoped>
section {
    display: flex;
    justify-content: center;
}
</style>