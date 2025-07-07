// src/router/index.js or router.js
import { createRouter, createWebHistory } from 'vue-router'
import SearchView from '@/views/SearchView.vue'
import FavoritesView from '@/views/FavoritesView.vue'
import MovieDetails from '@/views/MovieDetails.vue'

const routes = [
  { path: '/', name: 'Search', component: SearchView },
  { path: '/favorites', name: 'Favorites', component: FavoritesView },
  { path: '/movie/:id', name: 'MovieDetails', component: MovieDetails, props: true }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
