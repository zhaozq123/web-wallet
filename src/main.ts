import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import './../public/rem.js'
import './assets/main.css'
import './assets/flex.css'
import './assets/iconfont/iconfont.css'

const app = createApp(App)

app.use(ElementPlus)
app.mount('#app')
