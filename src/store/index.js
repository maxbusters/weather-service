import { createStore } from 'vuex'
import Config from '@/Config'

export default createStore({
  state: {
    favorites: [],
    selectedCities: [],
    weatherByGeoIsSet: false,
  },
  getters: {
    favorites(state) {
      return state.favorites
    },
    selectedCities(state) {
      return state.selectedCities.map(x => (x))
    },
  },
  mutations: {
    setFavorites(state, favorites) {
      state.favorites = favorites // concat(favorites)
    },
    addToFavorites(state, city) {
      state.favorites.push(city)
    },
    addToSelected(state, city) {
      state.selectedCities.push(city)
    },
    weatherByLocation(state) {
      state.weatherByGeoIsSet = true
    },
    deleteSelectedCity(state, id) {
      state.selectedCities = state.selectedCities.filter(city => city.id !== id)
    },
    deleteFavoriteCity(state, id) {
      state.favorites = state.favorites.filter(city => city.id !== id)
    },
  },
  actions: {
    initState({ state, commit, dispatch }) {
      const favorites = localStorage.getItem(Config.FAVORITES_STORAGE)
      if (favorites) {
        commit('setFavorites', JSON.parse(favorites))
      }
      else {
        state.favorites = []
        dispatch('updateLocalStorage')
      }
    },
    updateLocalStorage({ state }) {
      localStorage.setItem(Config.FAVORITES_STORAGE, JSON.stringify(state.favorites))
    },
    addToFavorites({ commit, dispatch }, city) {
      commit('addToFavorites', city)
      dispatch('updateLocalStorage')
    },
    addToSelected({ commit }, city) {
      commit('addToSelected', city)
    },
    weatherByLocation({ commit }) {
      commit('weatherByLocation')
    },
    deleteSelectedCity({ commit }, cityId) {
      commit('deleteSelectedCity', cityId)
    },
    deleteFavoriteCity({ commit, dispatch }, cityId) {
      commit('deleteFavoriteCity', cityId)
      dispatch('updateLocalStorage')
    },
  },
})
