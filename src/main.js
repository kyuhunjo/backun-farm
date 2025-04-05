import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

// 전역 스타일 가져오기
import './assets/styles/main.css'

// Material Design Icons 가져오기
import '@mdi/font/css/materialdesignicons.css'

loadFonts()

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(vuetify)
app.use(pinia)

app.mount('#app') 