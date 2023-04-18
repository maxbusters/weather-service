import { createApp } from 'vue'
import FlagIcon from 'vue-flag-icon'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'

createApp(App).use(i18n).use(store).use(router).use(FlagIcon).mount('#app')
