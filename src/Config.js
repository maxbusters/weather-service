export default {
  WEATHER_API_KEY: 'a1d61025faff0af71c05d5cf2f5dcd08',
  WEATHER_HOURLY_API_KEY: 'f81846a9551010a6957c9b40d16de18e',
  WEATHER_API_URL: 'https://api.openweathermap.org/data/2.5/',
  WEATHER_ICO_URL: 'https://openweathermap.org/img/wn/',
  FAVORITES_STORAGE: 'favoritesCitiesList',
  ABSTRACT_API_KEY: 'b961a61be455488d842b557e3c825065',
  ABSTRACT_API_URL: 'https://ipgeolocation.abstractapi.com/v1/',
  IPIFY_API_URL: 'https://api.ipify.org',
  LOCALES: ['en', 'uk'],
  MEASURE: 'metric',
  CELSIUS: '°C',
  FAHRENHEIT: '°F',
  CURR_UNIT: () => {
    if (!localStorage.getItem('measure') || localStorage.getItem('measure') === 'metric')
      return '°C'
    else
      return '°F'
  },
}
