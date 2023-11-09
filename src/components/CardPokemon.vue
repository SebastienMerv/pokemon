<script setup>
import { defineProps, ref, onMounted } from 'vue'

const props = defineProps({
    name: {
        type: String
    }
})

const name = props.name
const exp = ref('')
const height = ref('')
const weight = ref('')
const captureRate = ref('')
const growthRate = ref('')
const baseHappiness = ref('')

onMounted(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(response => response.json())
        .then(data => {
            exp.value = `Base expérience : ${data.base_experience}`
            document.getElementById(`img_${name}`).src = data.sprites.front_default
            height.value = `Height : ${data.height}`
            weight.value = `Weight : ${data.weight}`
            fetch(data.species.url)
                .then(response => response.json())
                .then(data => {
                    captureRate.value = `Capture Rate : ${data.capture_rate}`
                    growthRate.value = `Growth Rate : ${data.growth_rate.name}`
                })
                .catch(error => console.log(error))
            fetch(data.species.url)
                .then(response => response.json())
                .then(data => {
                    baseHappiness.value = `Expérience : ${data.base_happiness}`
                })
                .catch(error => console.log(error))
        })
        .catch(error => console.log(error))
})

const toggleCardInfos = () => {
    const cardInfos = document.getElementById(name)
    cardInfos.style.display = cardInfos.style.display === 'none' ? 'block' : 'none'
}
</script>

<template>
    <div class="poke_card">
        <img :src="`https://pokeapi.co/api/v2/pokemon/${name}`" alt="Image du pokémon" :id="`img_${name}`" height="200"
            @click="toggleCardInfos">
        <div class="poke_main">
            <h1>{{ name }}</h1>
        </div>
        <div class="poke_card_infos" :id="name" :style="{ display: 'none' }">
            <p :id="`exp_${name}`">{{ exp }}</p>
            <p>{{ height }}</p>
            <p>{{ weight }}</p>
            <p>{{ captureRate }}</p>
            <p>{{ growthRate }}</p>
            <p>{{ baseHappiness }}</p>
            <!-- Si la clé a le même nom que la var -> Je peux ne pas mettre le nom de la clé. Exemple name ci-dessous -->
            <RouterLink :to="{ name: 'PokemonDetail', params: { name } }" class="data_btn">
                Vers le pokemon
            </RouterLink>
        </div>
    </div>
</template>

<style scoped>
.poke_card {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.data_btn {
    background-color: #f44336;
    border: none;
    color: white;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    cursor: pointer;
    letter-spacing: 2px;
    transition: all 0.3s ease 0s;
}

.data_btn:hover {
    background-color: #434343;
    /* letter-spacing: 1px; */
    -webkit-box-shadow: 0px 5px 40px -10px rgba(0, 0, 0, 0.57);
    -moz-box-shadow: 0px 5px 40px -10px rgba(0, 0, 0, 0.57);
    box-shadow: 5px 40px -10px rgba(0, 0, 0, 0.57);
    transition: all 0.3s ease 0s;
}
</style>