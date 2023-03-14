import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// gloabl component
import Header from "@/components/public/Header.vue";
import Footer from "@/components/public/Footer.vue";

import './assets/main.css'

const app = createApp(App)

//gloable registeration 
app.component("Header", Header)
   .component("Footer", Footer);

app.use(createPinia())
app.use(router)

app.mount('#app')
