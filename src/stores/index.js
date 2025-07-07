import { createStore } from 'vuex'

const store = createStore({
  state: {
    favorites: []
  },
  mutations: {
    ADD_FAVORITE(state, movie) {
      if (!state.favorites.find(f => f.id === movie.id)) {
        state.favorites.push(movie)
      }
    },
    REMOVE_FAVORITE(state, movieId) {
      state.favorites = state.favorites.filter(movie => movie.id !== movieId)
    }
  },
  actions: {
    addFavorite({ commit }, movie) {
      commit('ADD_FAVORITE', movie)
    },
    removeFavorite({ commit }, movieId) {
      commit('REMOVE_FAVORITE', movieId)
    }
  },
  getters: {
    favorites: (state) => state.favorites,
    isFavorite: (state) => (movieId) => state.favorites.some(m => m.id === movieId)
  }
})

export default store
