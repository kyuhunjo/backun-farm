import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

// 전역 스타일 가져오기
import './assets/styles/main.css'

// Material Design Icons 가져오기
import '@mdi/font/css/materialdesignicons.css'

const app = createApp(App)

app.use(router)
app.use(vuetify)

app.mount('#app') 