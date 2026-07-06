import { defineStore } from "pinia";
import api from "../api/api";
import { useUserStore } from "./userStore";
export const useCartStore = defineStore("cart", {
    state: () => ({
        cart: []
    }),

    getters: {
        total(state) {
            return state.cart.reduce(
                (sum, product) => sum + product.price,0);
        },

        totalCount(state) {
            return state.cart.length;
        }
    },

    actions: {
        async getCart(userId) {
            const response = await api.get(`/cart?userId=${userId}`);
            this.cart = response.data;
        },

        async addToCart(product) {
    const userStore = useUserStore();

    const response = await api.post("/cart", {
        userId: userStore.currentUser.id,
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1
    });

    this.cart.push(response.data);
},

        async removeFromCart(id) {
            await api.delete(`/cart/${id}`);

            this.cart = this.cart.filter(
                item => item.id !== id
            );
        }
    }
});