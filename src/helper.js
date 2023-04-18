import api from './api'
import i18n from './i18n'

const countries = require('i18n-iso-countries')
countries.registerLocale(require('i18n-iso-countries/langs/en.json'))
countries.registerLocale(require('i18n-iso-countries/langs/uk.json'))

const geo = {
  lat: '',
  lon: '',
}

export default {
  countryAliasByISO(isoCountryCode) {
    const country = countries.getName(isoCountryCode.toUpperCase(), i18n.global.locale.value)
    return country
  },
  getLocale() {
    return i18n.global.locale.value
  },
  getWeatherObj(city) {
    return {
      id: city.id,
      fullName: `${city.name}, ${this.countryAliasByISO(city.sys.country)}`,
      countryAlias: this.countryAliasByISO(city.sys.country),
      name: city.name,
      coord: city.coord,
      country: city.sys.country,
      timezone: city.timezone,
      weather: {
        temperature: city.main,
        weather_info: city.weather,
        wind: city.wind,
      },
    }
  },
  async getTimezoneValue(coord) {
    const offset = (await api.getWeatherByGeo(coord.lat, coord.lon)).data.timezone
    return this.calcTimezoneTime(offset)
  },
  calcTimezoneTime(offset) {
    console.log(new Date())
    const d = new Date()
    const utc = d.getTime() + (d.getTimezoneOffset() * 60000)
    const nd = new Date(utc + (1000 * offset))
    return nd.getTime()
  },

  getChart() {
  },
}
