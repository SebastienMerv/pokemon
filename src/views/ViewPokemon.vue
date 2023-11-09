<script setup>
import { ref, onMounted } from 'vue';

// On récupère le nom du pokemon
const name = route.params.name

console.log(name);
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

// On récupère les détails du pokémon
onMounted(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(response => response.json())
        .then(data => {
            details.value.name = data.name
            details.value.height = `Height : ${data.height}`
            details.value.weight = `Weight : ${data.weight}`
            details.value.imageUrl = data.sprites.front_default; // Assigner l'URL de l'image
            fetch(data.species.url)
                .then(response => response.json())
                .then(data => {
                    details.value.captureRate = `Capture Rate : ${data.capture_rate}`
                    details.value.growthRate = `Growth Rate : ${data.growth_rate.name}`
                    details.value.baseHappiness = `Expérience : ${data.base_happiness}`
                    details.value.habitat = `Habitat : ${data.habitat.name}`
                    details.value.shape = `Shape : ${data.shape.name}`
                    details.value.color = `Color : ${data.color.name}`
                    fetch(data.evolution_chain.url)
                        .then(response => response.json())
                        .then(data => {
                            // On boucle sur chaque évolution du pokémon et on affiche son img dans le #evolutions
                            data.chain.evolves_to.forEach(evolution => {
                                evolutions.value.push(evolution.species.name)
                                fetch(`https://pokeapi.co/api/v2/pokemon/${evolution.species.name}`)
                                    .then(response => response.json())
                                    .then(data => {
                                        // On ajouter un li avec une img dedans et autour un a
                                        const li = document.createElement('li')
                                        const a = document.createElement('a')
                                        const img = document.createElement('img')
                                        img.src = data.sprites.front_default
                                        img.alt = `Image de ${evolution.species.name}`
                                        a.href = `./view.html?name=${evolution.species.name}`
                                        a.appendChild(img)
                                        li.appendChild(a)
                                        document.getElementById('evolutions').appendChild(li)
                                    })
                                    .catch(error => console.log(error));
                            })
                        })
                        .catch(error => console.log(error))
                })
                .catch(error => console.log(error))
        })
        .catch(error => {
            document.getElementById('data_pokemon').style.display = 'none'
            document.getElementById('evolution_chain').style.display = 'none'
        })
})
</script>
<template>
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
    <div class="evolution_chain" id="evolution_chain">
        <div class="data_header">
            <h1>Evolution Chain</h1>
        </div>
        <ul id="evolutions">
        </ul>
    </div>
</template>

<style>
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