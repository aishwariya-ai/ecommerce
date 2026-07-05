import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../stores/userStore";
import Home from "../components/Home.vue";
import Login from "../components/Login.vue";
import Cart from "../components/Cart.vue";
import ManageProduct from "../components/ManageProduct.vue";
import Register from "../components/Register.vue";
const routes = 
[
    {
        path: "/",
        component: Home
    },
    {
        path: "/login",
        component: Login
    },
    {
        path: "/cart",
        component: Cart,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/manageproduct",
        component: ManageProduct,
        meta: {
            requiresAuth: true,
            requiresAdmin: true
        }
    },
    {
        path:"/register",
        component:Register
    }
];
const router = createRouter({
    history: createWebHistory(),
    routes
});
router.beforeEach((to, from, next) => {

    const userStore = useUserStore();

    if (to.meta.requiresAuth&&!userStore.currentUser) 
      {
        next("/login");
    }
    else if (
        to.meta.requiresAdmin && userStore.currentUser?.role !== "admin"
    ) {
        next("/");
    }
    else {
        next();
    }
});

export default router;