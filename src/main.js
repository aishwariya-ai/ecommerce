import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './assets/style.css'

import App from './App.vue'
import router from './router'
import { useUserStore } from './stores/userStore'
import { useProductStore} from './stores/productStore'

const app = createApp(App)

app.use(createPinia())
app.use(router)
const userStore=useUserStore();
userStore.restoreUser();
const productStore=useProductStore();

    productStore.getProducts();
app.mount('#app')













