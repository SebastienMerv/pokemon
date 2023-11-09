import { createRouter, createWebHistory } from 'vue-router'
import View from '@/views/ViewPokemon.vue'
import ListPokemon from '@/views/ListPokemon.vue'

const routes = [
    { path: '/', component: ListPokemon },
    { path: '/pokemon/:name', component: View }
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})