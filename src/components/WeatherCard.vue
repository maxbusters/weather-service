<script setup>
import { computed, onMounted, ref } from 'vue'
import moment from 'moment'
import { useStore } from 'vuex'
import DeleteModal from './DeleteModal.vue'
import Config from '@/Config'
import helper from '@/helper'

const props = defineProps({
  city: {
    type: Object,
    required: true,
  },
  isFavoritesPage: {
    type: Boolean,
    required: true,
  },
})

const store = useStore()

const city = ref(props.city)
const localTime = ref(null)
const showDeleteModal = ref(false)
const width = ref(window.innerWidth)

function getTimeByLocation() {
  if (city.value.timezone) {
    const time = helper.calcTimezoneTime(city.value.timezone)
    localTime.value = time
  }
  else {
    helper.getTimezoneValue(city.value.coord).then((resp) => {
      localTime.value = resp
    })
  }
}

function deleteSelectedCity() {
  const id = city.value.id
  showDeleteModal.value = false
  if (props.isFavoritesPage === true)
    store.dispatch('deleteFavoriteCity', id)
  else
    store.dispatch('deleteSelectedCity', id)
}

const timeOfDayStyle = computed(() => {
  let hours = 0
  if (localTime.value)
    hours = new Date(localTime.value).getHours()
  else
    hours = new Date().getHours()
  if (hours >= 18 || hours < 6)
    return '--night'

  else
    return '--day'
})

const selectedCitiesCount = computed(() => {
  const cities = store.getters.selectedCities
  if (!cities)
    return 0

  return cities.length
})

const formattedDate = computed(() => {
  const date = new Date(localTime.value)
  return moment(date).format('MMM d HH:mm')
})
onMounted(() => {
  getTimeByLocation()
})
</script>

<template>
  <div>
    <DeleteModal :show="showDeleteModal" @delete="deleteSelectedCity" @cancel="showDeleteModal = false" />
    <div class="card__weather weather" :class="`weather${timeOfDayStyle}`">
      <div v-if="selectedCitiesCount > 1 || props.isFavoritesPage" class="weather__delete"
        @click="showDeleteModal = true">
        <img src="@/assets/High-contrast-edit-delete.svg">
      </div>
      <div class="weather__title">
        <div class="weather__location">
          <h2>{{ city.fullName }}</h2>
          <img v-if="city.isFavorite" class="item__star" src="@/assets/star-icon.svg">
        </div>
        <div class="weather__time">
          {{ formattedDate }}
        </div>
      </div>

      <div class="weather__info">
        <div class="weather__icon">
          <img :src="`${Config.WEATHER_ICO_URL}${city.weather.weather_info[0].icon}@4x.png`" alt="Weather Icon">
        </div>
        <div class="weather__stats">
          <div class="temperature">
            {{ parseInt(city.weather.temperature.temp) + Config.CURR_UNIT() }}
          </div>
          <div class="wind">
            <div class="wind__speed">
              {{ $t('weather.wind') }}: {{ `${city.weather.wind.speed} ${$t('weather.speed')}` }}
            </div>
          </div>
          <div class="description">
            {{ `${city.weather.weather_info[0].description}` }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.weather {
  width: 100%;
  min-width: 400px;
  border-radius: 5px;
  -webkit-box-shadow: 0 0 10px rgba(193, 157, 157, 0.2);
  box-shadow: 0 0 10px rgba(193, 157, 157, 0.2);
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  position: relative;
  margin: 0 1rem;
  -webkit-transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  -o-transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;

  @media (max-width: 1100px) {
    margin: 0 auto;
    max-width: 90%;
  }

  @media (max-width: 850px) {
    margin: 0 auto;
    max-width: 90%;
  }

  @media (max-width: 600px) {
    min-width: 200px;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }

  &__title {
    padding: 20px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    max-width: 200px;

    @media (max-width: 400px) {
      max-width: 200px;
    }
  }

  .weather__title:hover {

    .weather__location,
    .weather__time {
      -webkit-transform: translateX(30px) scale(1.3);
      -ms-transform: translateX(30px) scale(1.3);
      transform: translateX(30px) scale(1.3)
    }

    @media (max-width: 500px) {
      max-width: 200px;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;

      .weather__location,
      .weather__time {
        -webkit-transform: none;
        -ms-transform: none;
        transform: none
      }
    }
  }

  .weather__info:hover {
    -webkit-transform: translateY(20px) scale(1.3);
    -ms-transform: translateY(20px) scale(1.3);
    transform: translateY(20px) scale(1.3);

    @media (max-width: 600px) {
      -webkit-transform: none;
      -ms-transform: none;
      transform: none
    }
  }

  .weather__delete:hover {
    -webkit-transform: scale(1.2);
    -ms-transform: scale(1.2);
    transform: scale(1.2);
    cursor: pointer;
  }
}

.weather--day {
  background-color: #ffffff;
  color: #333;
}

.weather--night {
  background-color: #333;
  color: #fff;
}

.weather__info {
  -webkit-transition: -webkit-transform 1s ease-in-out;
  transition: -webkit-transform 1s ease-in-out;
  -o-transition: transform 1s ease-in-out;
  transition: transform 1s ease-in-out;
  transition: transform 1s ease-in-out, -webkit-transform 1s ease-in-out;
}

.weather__location {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-transition: -webkit-transform 0.3s ease-in-out;
  transition: -webkit-transform 0.3s ease-in-out;
  -o-transition: transform 0.3s ease-in-out;
  transition: transform 0.3s ease-in-out;
  transition: transform 0.3s ease-in-out, -webkit-transform 0.3s ease-in-out;
}

.weather__time {
  text-align: left;
  -webkit-transition: -webkit-transform 0.3s ease-in-out;
  transition: -webkit-transform 0.3s ease-in-out;
  -o-transition: transform 0.3s ease-in-out;
  transition: transform 0.3s ease-in-out;
  transition: transform 0.3s ease-in-out, -webkit-transform 0.3s ease-in-out;
}

.weather__info {
  padding: 20px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: flex-start;
  -webkit-transition: -webkit-transform 0.2s ease-in-out;
  transition: -webkit-transform 0.2s ease-in-out;
  -o-transition: transform 0.2s ease-in-out;
  transition: transform 0.2s ease-in-out;
  transition: transform 0.2s ease-in-out, -webkit-transform 0.2s ease-in-out;
}

.temperature {
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 10px;

  @media (max-width: 600px) {
    font-size: 30px;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }
}

.weather__icon {
  img {
    @media (max-width: 450px) {
      width: 100px;
    }
  }

}

.wind {
  font-size: 16px;
  margin-bottom: 5px;

  @media (max-width: 500px) {
    font-size: 14px;
  }
}

.description {
  font-size: 18px;

  @media (max-width: 500px) {
    font-size: 14px
  }
}

.item__star {
  margin-left: 5px;
  width: 18px;
  display: inline;

  @media (max-width: 500px) {
    widows: 10px;
  }
}

.weather__delete {
  -webkit-transition: -webkit-transform 0.3s ease-in-out;
  transition: -webkit-transform 0.3s ease-in-out;
  -o-transition: transform 0.3s ease-in-out;
  transition: transform 0.3s ease-in-out;
  transition: transform 0.3s ease-in-out, -webkit-transform 0.3s ease-in-out;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1;

  @media (max-width: 500px) {
    img {
      width: 25px;
    }
  }
}
</style>
