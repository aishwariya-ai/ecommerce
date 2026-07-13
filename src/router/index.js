import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../stores/userStore";
import Home from "../views/HomeView.vue";
import Login from "../views/LoginView.vue";
import Cart from "../views/CartView.vue";
import ManageProduct from "../views/ManageProductView.vue";
import Register from "../views/RegisterView.vue";
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
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes
});
router.beforeEach((to, from, next) => {

    const userStore = useUserStore();

    if (to.meta.requiresAuth && !userStore.currentUser &&!token) 
      {
        next("/login");
    }
    else if (
        to.meta.requiresAdmin && userStore.currentUser?.role !== "admin" && !token)
         {
        next("/");
    }
    else {
        next();
    }
});

export default router;