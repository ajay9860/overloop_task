<template>
  <div class="container mt-4">
    <h2>Favorite Movies</h2>
    <div v-if="favorites.length" class="row row-cols-1 row-cols-md-4 g-4">
      <div v-for="movie in favorites" :key="movie.id" class="col">
        <div class="card h-100">
          <img :src="getImageUrl(movie.poster_path)" class="card-img-top" />
          <div class="card-body">
            <h5 class="card-title">{{ movie.title }}</h5>
            <p class="card-text">{{ movie.overview }}</p>
            <button class="btn btn-danger btn-sm" @click="removeFavorite(movie.id)">
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
    <p v-else class="text-muted">No favorites added yet.</p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters(['favorites'])
  },
  methods: {
    ...mapActions(['removeFavorite']),
    getImageUrl(path) {
      return path ? `https://image.tmdb.org/t/p/w342${path}` : ''
    }
  }
}
</script>
