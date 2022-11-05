import {createApp} from 'vue'
import {createPinia} from 'pinia'
import App from './App.vue'
import ElementPlus from "element-plus";
import 'element-plus/dist/index.css'
import {router} from './router/routers.js'


const pinia = createPinia()


import '@/style/reset.scss'
import '@/style/app.scss'
import '@/style/element-overwrite.scss'

const app = createApp(App)

app.use(pinia)
    .use(ElementPlus)
    .use(router)
    .mount('#app')
