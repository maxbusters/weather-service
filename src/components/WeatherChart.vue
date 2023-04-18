<script setup>
import { onMounted, ref } from 'vue'
import Chart from 'chart.js/auto'
import moment from 'moment'
import api from '@/api'
import Config from '@/Config'

const props = defineProps({
  city: {
    type: Object,
    required: true,
  },
})

const city = ref(props.city)
const range = ref({
  min: null,
  max: null,
})

const hourlyValues = ref([])

function getWeatherHourly() {
  api.getHourlyByGeo(city.value).then((resp) => {
    hourlyValues.value = resp.data.list
    createChart()
  })
}

function createChart() {
  const hours = []
  const degrees = []
  for (const el of hourlyValues.value) {
    hours.push(`${moment(el.dt_txt).format('HH:mm')}\n\r${el.weather[0].description}`)
    degrees.push(`${el.main.temp}`)
  }

  return new Chart(document.getElementById(`hourly-weather-${city.value.id}`), {
    type: 'line',
    data: {
      labels: hours,
      datasets: [
        {
          data: degrees,
          label: `${city.value.name}, ${Config.CELSIUS}`,
          borderColor: '#3cba9f',
          fill: false,
        }],
    },
    options: {
      title: {
        display: true,
      },
    },
  })
}

onMounted(() => {
  getWeatherHourly()
})
</script>

<template>
  <div class="chart-container">
    <canvas :id="`hourly-weather-${city.id}`" class="chart__canvas" />
  </div>
</template>

<style>
.chart-container {
  margin-left: 50px;

  @media (max-width: 1100px) {
    margin: 0;
  }
}

.chart__canvas {
  position: relative;
  height: 50vh;
  width: 40vw;

  @media (max-width: 1100px) {
    width: 100vw;
    max-width: 90%;
    margin: 0 auto;
    margin-top: 30px
  }
}
</style>
