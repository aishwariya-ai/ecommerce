import { createApp } from "vue";
import { createPinia } from "pinia";
import { createVuetify } from "vuetify";
import App from "./App.vue";
import router from "./router";
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
//import "./assets/style.css";
import { useProductStore } from "./stores/productStore";
import { useUserStore } from "./stores/userStore";
//import { createRulesPlugin } from 'vuetify/labs/rules'
import Toast from"vue-toastification";
import "vue-toastification/dist/index.css";
import validation from "./plugins/validation.js";
const app = createApp(App);


const pinia = createPinia();
const vuetify = createVuetify({
    theme:{
        defaultTheme:"light",
        themes:{
            light:{
                colors:{
                    primary:"#5309b5",
                    secondary:"#69d9ce",
                    error:"#B00020"
                }
            }
        }
    }
})

app.use(pinia);
app.use(router);
app.use(vuetify);
app.use(Toast);
app.use(validation);
//app.use(createRulesPlugin({}, vuetify.locale))
const userStore = useUserStore();
userStore.restoreUser();

const productStore = useProductStore();
await productStore.getProducts();

app.mount("#app");