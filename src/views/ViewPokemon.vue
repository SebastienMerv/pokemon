<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PokemonNotFound from './PokemonNotFound.vue';

const route = useRoute()

// On récupère le nom du pokemon
const name = route.params.name
// On set les détails du pokémon
const details = ref({
    name: '',
    height: '',
    weight: '',
    captureRate: '',
    growthRate: '',
    baseHappiness: '',
    habitat: '',
    shape: '',
    color: '',
    imageUrl: ''
})

// On set l'URL de l'image
const imageUrl = ref('');
const router = useRouter()

// On récupère les détails du pokémon
onMounted(async () => {

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        if (response.status === 404) {
            await router.push('/pokemon/404')
        }

        const data = await response.json()
        details.value.name = data.name
        details.value.height = `Height : ${data.height}`
        details.value.weight = `Weight : ${data.weight}`
        details.value.imageUrl = data.sprites.front_default; // Assigner l'URL de l'image

        const response2 = await fetch(data.species.url)
        const data2 = await response2.json()
        details.value.captureRate = `Capture Rate : ${data2.capture_rate}`
        details.value.growthRate = `Growth Rate : ${data2.growth_rate.name}`
        details.value.baseHappiness = `Expérience : ${data2.base_happiness}`
        details.value.habitat = `Habitat : ${data2.habitat.name}`
        details.value.shape = `Shape : ${data2.shape.name}`
        details.value.color = `Color : ${data2.color.name}`

        const response3 = fetch(data.evolution_chain.url)
        const data3 = await response3.json()
        // On boucle sur chaque évolution du pokémon et on affiche son img dans le #evolutions
        data3.chain.evolves_to.forEach(async evolution => {
            evolutions.value.push(evolution.species.name)
            const response4 = await fetch(`https://pokeapi.co/api/v2/pokemon/${evolution.species.name}`)
            const data4 = await response4.json()
            // On ajouter un li avec une img dedans et autour un a
            const li = document.createElement('li')
            const a = document.createElement('a')
            const img = document.createElement('img')
            img.src = data4.sprites.front_default
            img.alt = `Image de ${evolution.species.name}`
            a.href = `/pokemon/${evolution.species.name}`
            a.appendChild(img)
            li.appendChild(a)
            document.getElementById('evolutions').appendChild(li)
        })
    } catch (e) {
        // Vers l'url -> Création d'une page si tel est le cas
        // await router.push('/404')
    }
})
</script>
<template>
    <RouterLink :to="'/'">Retour</RouterLink>
    <div class="data_pokemon" id="data_pokemon">
        <div class="data_header">
            <h1>Who's That Pokémon? <span id="name">{{ details.name }}</span></h1>
        </div>
        <div class="data_container">
            <img :id="'img' + _name" alt="Image du pokémon" :src="details.imageUrl">
            <div class="specifies">
                <div class="details_data">
                    <h3 id="details_title">Details Pokemon</h3>
                    <p id="height">{{ details.height }}</p>
                    <p id="weight">{{ details.weight }}</p>
                    <p id="capture_rate">{{ details.captureRate }}</p>
                    <p id="growth_rate">{{ details.growthRate }}</p>
                    <p id="base_exp">{{ details.baseHappiness }}</p>
                </div>
                <div class="species_data">
                    <h3 id="species_title">Species data</h3>
                    <p id="habitat">{{ details.habitat }}</p>
                    <p id="shape">{{ details.shape }}</p>
                    <p id="color">{{ details.color }}</p>
                </div>
            </div>
        </div>
    </div>
    <!-- Doens't work because of Bug -->
    <!-- <div class="evolution_chain" id="evolution_chain">
                                        <div class="data_header">
                                            <h1>Evolution Chain</h1>
                                        </div>
                                        <ul id="evolutions">
                                        </ul>
                                    </div> -->
</template>

<style scoped>
.data_pokemon {
    border: 1px solid black;
    margin-top: 20px;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    border-radius: 8px;
}

.data_header {
    width: 100%;
    text-align: center;
    background-color: #5784BA;
    border-radius: 8px 8px 0px 0px;
    margin-bottom: 15px;
}

.data_container {
    display: flex;
    text-align: center;
    justify-content: space-around;
    align-items: center;
    width: 100%;
}

.data_container img {
    height: 200px;
    width: 200px;
}

.specifies {
    display: flex;
    flex-direction: row;
    width: 50%;
    justify-content: space-around;
}

#details_title {
    color: #C18845;
}

#species_title {
    color: #C18845;
}

.evolution_chain {
    border: 1px solid black;
    margin-top: 20px;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    border-radius: 8px;
}

ul {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    list-style-type: none;
}
</style>