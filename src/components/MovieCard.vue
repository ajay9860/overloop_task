<template>
  <div class="card h-100">
    <img :src="getImageUrl(movie.poster_path)" class="card-img-top" />
    <div class="card-body">
      <h5 class="card-title">{{ movie.title }}</h5>
      <button class="btn btn-sm"
        :class="isFavorite ? 'btn-danger' : 'btn-outline-primary'"
        @click="toggleFavorite">
        {{ isFavorite ? 'Remove Favorite' : 'Add to Favorites' }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: ['movie'],
  computed: {
    ...mapGetters(['isFavorite']),
    isFavorite() {
      return this.$store.getters.isFavorite(this.movie.id)
    }
  },
  methods: {
    ...mapActions(['addFavorite', 'removeFavorite']),
    toggleFavorite() {
      if (this.isFavorite) {
        this.removeFavorite(this.movie.id)
      } else {
        this.addFavorite(this.movie)
      }
    },
    getImageUrl(path) {
      return path ? `https://image.tmdb.org/t/p/w342${path}` : ''
    }
  }
}
</script>
