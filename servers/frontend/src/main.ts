import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import i18n from '@/assets/languages'
import { useTheme } from '@/composables/useTheme'
import './index.css'
import './assets/styles/theme.css'

const app = createApp(App)

app.use(createPinia())
app.use(i18n)
app.use(router)

// 初始化主题
useTheme()

app.mount('#app')
