<template>
  <form @submit.prevent="searchMovies" class="row g-3">
    <div class="col-md-4">
      <input v-model="title" class="form-control" placeholder="Title" />
    </div>
    <div class="col-md-3">
      <input v-model="year" class="form-control" type="number" placeholder="Year" />
    </div>
    <div class="col-md-3">
      <select v-model="genre" class="form-select">
        <option value="">Select Genre</option>
        <option v-for="g in genres" :key="g.id" :value="g.id">{{ g.name }}</option>
      </select>
    </div>
    <div class="col-md-2">
      <button type="submit" class="btn btn-primary w-100">Search</button>
    </div>
    <div v-if="errorMessage" class="text-danger mt-2">{{ errorMessage }}</div>
  </form>
</template>

<script>
export default {
  name: 'SearchForm',
  data() {
    return {
      title: '',
      year: '',
      genre: '',
      errorMessage: '',
      genres: []
    }
  },
  mounted() {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=YOUR_API_KEY`)
      .then(res => res.json())
      .then(data => { this.genres = data.genres })
  },
  methods: {
    searchMovies() {
      if (!this.title && !this.year && !this.genre) {
        this.errorMessage = 'Please enter at least one search criteria.'
        return
      }
      this.errorMessage = ''
      this.$emit('search', {
        title: this.title,
        year: this.year,
        genre: this.genre
      })
    }
  }
}
</script>
