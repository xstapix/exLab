import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'
import Editor from 'vue-editor-js'


const app = createApp(App)
const pinia = createPinia()

Vue.use(Editor)

app.use(pinia)
app.use(router)
app.mount('#app')