<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import WeatherCard from './WeatherCard.vue'
import WeatherChart from './WeatherChart.vue'

const store = useStore()
const favoritesList = computed(() => {
  return store.getters.favorites
})
</script>

<template>
  <section v-if="favoritesList.length > 0" class="section__weather">
    <div v-for="city of favoritesList " :key="city.id" class="section__wrapper">
      <WeatherCard :city="city" :is-favorites-page="true" />
      <WeatherChart :city="city" />
    </div>
  </section>
  <section v-else class="section__weather">
    <h2>{{ $t('favorites.empty') }}</h2>
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
</style>
