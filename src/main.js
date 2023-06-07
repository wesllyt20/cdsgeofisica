import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import VueGtag from "vue-gtag";

loadFonts()


const app = createApp(App)
// Configuración de vue-gtag
const isProduction = process.env.NODE_ENV === 'pro';
const googleAnalyticsId = isProduction ? 'G-HX5JKDVM5E' : null;

app.use(VueGtag, {
  config: { id: googleAnalyticsId }
});

app.use(vuetify)
app.mount('#app')