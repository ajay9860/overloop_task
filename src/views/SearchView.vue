<template>
  <div class="container mt-4">
    <h2>Movie Search</h2>

    <form @submit.prevent="searchMovies" class="mb-4 row g-2">
      <div class="col-md-4">
        <input v-model="title" type="text" class="form-control" placeholder="Enter movie title" required />
      </div>
      <div class="col-md-2">
        <button type="submit" class="btn btn-primary w-100">Search</button>
      </div>
    </form>

    <div v-if="movies.length" class="row row-cols-1 row-cols-md-4 g-4">
      <div v-for="movie in movies" :key="movie.id" class="col">
        <div class="card h-100">
          <img
            :src="getImageUrl(movie.poster_path)"
            class="card-img-top"
            alt="Movie Poster"
            v-if="movie.poster_path"
          />
          <div class="card-body">
            <h5 class="card-title">{{ movie.title }}</h5>
            <p class="card-text"><strong>Year:</strong> {{ movie.release_date?.split('-')[0] || 'N/A' }}</p>
            <p class="card-text">{{ movie.overview || 'No description available.' }}</p>
            <p class="card-text"><strong>Rating:</strong> {{ movie.vote_average }}</p>

            <!-- 🔴 Add / Remove Favorite Button -->
            <button
              class="btn btn-outline-danger w-100 mt-2"
              @click="toggleFavorite(movie)"
            >
              {{ isFavorite(movie.id) ? 'Remove from Favorites' : 'Add to Favorites' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <p v-else-if="searched" class="text-muted">No movies found.</p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'SearchView',
  data() {
    return {
      title: 'Avengers', // Default movie title on load
      movies: [],
      searched: false,
      API_KEY: import.meta.env.VITE_TMDB_API_KEY,
    }
  },
  computed: {
    ...mapGetters(['favorites', 'isFavorite'])
  },
  methods: {
    ...mapActions(['addFavorite', 'removeFavorite']),
    async searchMovies() {
      if (!this.title.trim()) return;

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${this.API_KEY}&query=${encodeURIComponent(this.title)}`
        );
        const data = await response.json();
        this.movies = data.results || [];
        this.searched = true;
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    },
    getImageUrl(path) {
      return path ? `https://image.tmdb.org/t/p/w342${path}` : '';
    },
    toggleFavorite(movie) {
      if (this.isFavorite(movie.id)) {
        this.removeFavorite(movie.id);
      } else {
        this.addFavorite(movie);
      }
    }
  },
  mounted() {
    this.searchMovies();
  }
}
</script>

<style scoped>
.card-img-top {
  height: 300px;
  object-fit: cover;
}
</style>
