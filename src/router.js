import { createRouter, createWebHistory } from 'vue-router'
import ViewPokemon from '@/views/ViewPokemon.vue'
import ListPokemon from '@/views/ListPokemon.vue'
import PokemonNotFound from '@/views/PokemonNotFound.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: ListPokemon
    },
    {
        path: '/pokemon/:name',
        name: 'PokemonDetail',
        component: ViewPokemon
    },
    {
        path: '/pokemon/404',
        name: 'PokemonNotFound',
        component: PokemonNotFound
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})
