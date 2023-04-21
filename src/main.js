import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import VueGtag from "vue-gtag";


loadFonts()


const app = createApp(App)

// Configuración de vue-gtag
app.use(VueGtag, {
  config: { id: 'G-HX5JKDVM5E' }
})

app.use(vuetify)
app.mount('#app')