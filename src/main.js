import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { i18n } from './plugins/Vue-i18n'
import { vuetify } from './plugins/vuetify'
import App from './App.vue'
import router from './router'
import { useAuthStore } from '@/stores'
const app = createApp(App)
app.use(i18n)
app.use(vuetify)
app.use(createPinia())
// Initialize the auth store
const authStroe = useAuthStore()
authStroe.setupAuthChangeListener()
await authStroe.initialize() // wait checking valid token before loading router
app.use(router)

app.mount('#app')
