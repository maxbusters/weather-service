<!-- eslint-disable @typescript-eslint/no-var-requires -->
<script setup>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import WeatherCard from './WeatherCard.vue'
import WeatherChart from './WeatherChart.vue'
import api from '@/api'
import helper from '@/helper'

const store = useStore()
const geo = ref({
  lat: '',
  long: '',
})

const weatherByLocation = ref(null)

function getGeoInfo() {
  if (store.state.weatherByGeoIsSet)
    return

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition)
  }
  else {
    api.getCurrentGeo().then((resp) => {
      geo.value.lat = resp.data.latitude
      geo.value.long = resp.data.longitude
      getWeatherByGeo()
    })
  }
}

function showPosition(position) {
  geo.value.lat = position.coords.latitude
  geo.value.long = position.coords.longitude
  getWeatherByGeo()
}

function getWeatherByGeo() {
  api.getWeatherByGeo(geo.value.lat, geo.value.long).then((resp) => {
    const city = resp.data
    weatherByLocation.value = {
      ...helper.getWeatherObj(city),
      isFavorite: isFavorite(city.id),
      isSelected: isSelected(city.id),
      isCurrentPosition: true,
    }
    if (!isSelected(city.id) && !store.state.weatherByGeoIsSet) {
      store.dispatch('addToSelected', weatherByLocation.value)
      store.dispatch('weatherByLocation')
    }
  })
}

const favoritesList = computed(() => {
  return store.getters.favorites
})

const selectedCitiesList = computed(() => {
  return store.getters.selectedCities
})

function isFavorite(cityId) {
  const res = favoritesList.value.find(city => city.id === cityId)
  if (!res)
    return false

  return true
}

function isSelected(cityId) {
  const res = selectedCitiesList.value.find(city => city.value.id === cityId)
  if (!res)
    return false

  return true
}

onMounted(() => {
  getGeoInfo()
})
</script>

<template>
  <section class="section__weather">
    <div v-for="(city, inx) in selectedCitiesList" :key="city.id" class="section__wrapper">
      <WeatherCard :city="city" :is-favorites-page="false" />
      <WeatherChart :city="city" />
      <hr v-if="inx !== selectedCitiesList.length - 1" class="divider">
    </div>
  </section>
</template>

<style lang="scss" scoped>
.section__wrapper {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  margin: 30px 0;

  @media (max-width: 1100px) {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
  }
}

.divider {
  margin: 30px 0;
  border-bottom: 2px solid black;
  width: 100%;
}
</style>
