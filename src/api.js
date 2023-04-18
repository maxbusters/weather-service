import axios from 'axios'
import config from './Config'
import i18n from './i18n'
import Config from './Config'

axios.defaults.baseURL = config.WEATHER_API_URL
const localeSetting = `&lang=${i18n.global.locale.value}&units=${localStorage.getItem('measure') || Config.MEASURE}`

export default {
  searchCitiesByName(searchValue) {
    return axios.get(
      `find?q=${searchValue}&type=like&cnt=10&appid=${config.WEATHER_API_KEY}${localeSetting}`,
    )
  },
  getWeatherByGeo(lat, long) {
    return axios.get(
      `weather?lat=${lat}&lon=${long}&appid=${config.WEATHER_API_KEY}${localeSetting}`,
    )
  },
  getCurrentGeo() {
    return axios.get(`${config.ABSTRACT_API_URL}?api_key=${config.ABSTRACT_API_KEY}`)
  },
  getHourlyByGeo(geo) {
    return axios.get(`forecast?lat=${geo.coord.lat}&lon=${geo.coord.lon}&cnt=16&appid=${config.WEATHER_API_KEY}${localeSetting}`)
  },
  getIP() {
    return axios.get(config.IPIFY_API_URL)
  },
}
