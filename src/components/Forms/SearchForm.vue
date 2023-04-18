<!-- eslint-disable @typescript-eslint/no-var-requires -->
<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useStore } from 'vuex'
import api from '@/api'
import helper from '@/helper'

const emit = defineEmits(['setWeather'])

const store = useStore()

const searchField = ref('')
const searchResults = ref([])
const showAutocomplete = ref(false)
const selectedCity = ref(null)
// const measure = ref(localStorage.getItem('measure') || Config.MEASURE)

async function filterCities() {
  if (searchField.value.length < 3) {
    searchResults.value = []
    showAutocomplete.value = false
    return
  }
  api.searchCitiesByName(searchField.value).then((response) => {
    selectedCity.value = null
    searchResults.value = []
    if (response.data.list.length > 0) {
      for (const city of response.data.list) {
        searchResults.value.push(
          {
            ...helper.getWeatherObj(city),
            time: new Date(city.dt).getHours(),
            isFavorite: isFavorite(city.id),
            isSelected: isSelected(city.id),
          },
        )
      }
    }

    if (searchResults.value.length > 0)
      showAutocomplete.value = true
    else
      showAutocomplete.value = false
  }).catch((e) => {
    console.log(e)
  })
}
function selectCity(city) {
  selectedCity.value = city
  showAutocomplete.value = false
  searchField.value = `${city.name}, ${city.country}`
}

function clearSearch() {
  selectedCity.value = null
  showAutocomplete.value = false
  searchField.value = ''
}

function closeDropdown(event) {
  if (
    !event.target.closest('.search__form')
    || (event.target.closest('.search__form')
      && !event.target.closest('.search__form').contains(event.target))
  )
    showAutocomplete.value = false
}

function addToFavorites() {
  if (!isFavoritesFull())
    store.dispatch('addToFavorites', selectedCity.value)
  selectedCity.value.isFavorite = true
}

function addToList() {
  if (!isSelectedFull()) {
    store.dispatch('addToSelected', selectedCity.value)
    clearSearch()
  }
}

const favoritesList = computed(() => {
  return store.getters.favorites
})

const selectedCitiesList = computed(() => {
  return store.getters.selectedCities
})

function isFavoritesFull() {
  return favoritesList.value.length >= 5
}

function isSelectedFull() {
  return selectedCitiesList.value.length >= 5
}

function isFavorite(cityId) {
  const res = favoritesList.value.find(city => city.id === cityId)
  if (!res)
    return false

  return true
}

function isSelected(cityId) {
  const res = selectedCitiesList.value.find(city => city.id === cityId)
  if (!res)
    return false

  return true
}

// function setMeasure() {
//   localStorage.setItem('measure', measure.value)
// }
onMounted(() => {
  document.addEventListener('click', closeDropdown)
})
onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
})
</script>

<template>
  <div class="search">
    <h2 class="search__title">
      {{ $t('main.search_form.title') }}
    </h2>
    <div class="search__container">
      <div class="search__form">
        <input id="search-field" v-model="searchField" class="search__input" type="text" name="city"
          :placeholder="$t('main.search_form.placeholder')" @input="filterCities()">
        <ul v-if="showAutocomplete" class="search__autocomplete autocomplete">
          <li v-for="(city, index) in searchResults" :key="index" class="autocomplete__item item"
            @click="selectCity(city)">
            <div class="item__city">
              {{ city.name }}
              <div class="item__status">
                <img v-if="city.isSelected" class="item__checkmark" src="@/assets/confirm-icon.svg">
                <img v-if="city.isFavorite" class="item__star" src="@/assets/star-icon.svg">
              </div>
            </div>
            <div class="item__country">
              {{ helper.countryAliasByISO(city.country) }}
            </div>
          </li>
        </ul>
      </div>
      <button v-if="selectedCity" :disabled="selectedCity.isFavorite || isFavoritesFull()" type="button"
        @click="addToFavorites">
        {{ $t('button.add_to_favorites') }}
      </button>
      <button v-if="selectedCity" :disabled="selectedCity.isSelected || isSelectedFull()" type="button"
        @click="addToList">
        {{ $t('button.add_to_list') }}
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: flex-start;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  margin: 0 1rem;

  &__container {
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
    margin-bottom: 50px;
    width: 100%;

    button {
      margin-left: 10px
    }

    @media (max-width: 600px) {
      margin-bottom: 20px;
    }
  }

  &__form {
    position: relative;
    width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
  }

  &__input {
    width: 100%;
    padding: 12px 20px;
    font-size: 22px;
    border: 2px solid #ccc;
    outline: none;
  }

  &__input:focus {
    border-color: #007bff;
  }
}

.autocomplete {
  position: absolute;
  z-index: 2;
  top: 100%;
  left: 0;
  width: 99%;
  max-height: 200px;
  overflow-y: auto;
  background-color: #fff;
  list-style: none;
  margin: 0;
  padding: 0;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 0 0 5px 5px;

  &__item {
    cursor: pointer;
  }

  .item {
    padding: 10px;

    &__city {
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
      font-size: 18px;
      font-weight: bold;
    }

    &__status {
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

      img {
        margin: 0 3px;
        width: 15px;
      }
    }

    &__country {
      font-size: 14px;
      color: #555;
    }
  }

  .item:hover {
    background-color: #f2f2f2;
  }
}
</style>
