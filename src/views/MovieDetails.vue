<template>
  <div v-if="movie" class="container mt-4">
    <div class="row">
      <div class="col-md-4">
        <img
          :src="posterUrl"
          class="img-fluid rounded shadow"
          :alt="movie.title"
        />
      </div>
      <div class="col-md-8">
        <h2>{{ movie.title }} ({{ releaseYear }})</h2>
        <p><strong>Rating:</strong> {{ movie.vote_average }}</p>
        <p>{{ movie.overview }}</p>
      </div>
    </div>
  </div>
  <div v-else class="text-center mt-5">
    <div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const movie = ref(null)

const fetchMovieDetails = async () => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY
  const movieId = route.params.id
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`

  try {
    const res = await fetch(url)
    const data = await res.json()
    movie.value = data
  } catch (err) {
    console.error('Error fetching movie details:', err)
  }
}

onMounted(fetchMovieDetails)

const posterUrl = computed(() =>
  movie.value?.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.value.poster_path}`
    : ''
)

const releaseYear = computed(() =>
  movie.value?.release_date ? movie.value.release_date.split('-')[0] : ''
)
</script>
