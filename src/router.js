import { createRouter, createWebHistory } from 'vue-router'
import ViewPokemon from '@/views/ViewPokemon.vue'
import ListPokemon from '@/views/ListPokemon.vue'
import PokemonNotFound from '@/views/PokemonNotFound.vue'
import Home from '@/views/Home.vue'

const routes = [
    {
        path: '/pokemon/list',
        name: 'PokemonList',
        component: ListPokemon
    },
    {
        path: '/',
        name: 'Index',
        component: Home
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
