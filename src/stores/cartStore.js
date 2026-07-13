import { defineStore } from "pinia";
import api from "../api/api";
import { useUserStore } from "./userStore";
import {useToast} from "vue-toastification";
const toast=useToast();
export const useCartStore = defineStore("cart", {
    state: () => ({
        cart: []
    }),

    getters: {
        total(state) {
            return state.cart.reduce(
                (sum, product) => sum + (product.price * product.quantity),0);
        },

        totalCount(state) {
            return state.cart.reduce((sum,product)=>sum+product.quantity,0);
        }
    },

    actions: {
        async getCart(userId) {
            const response = await api.get(`/cart?userId=${userId}`);
            this.cart = response.data;
        },

async addToCart(product, userId) {

    const existingResponse = await api.get(
        `/cart?userId=${userId}&productId=${product.id}`
    );

    if (existingResponse.data.length > 0) {

        const existingProduct = existingResponse.data[0];

        existingProduct.quantity++;

        const response = await api.put(
            `/cart/${existingProduct.id}`,
            existingProduct
        );

        const index = this.cart.findIndex(
            item => item.id === existingProduct.id
        );

        if (index !== -1) {
            this.cart[index] = response.data;
        }

        toast.success("Quantity Updated");

    } else {

        const response = await api.post("/cart", {
            userId,
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });

        this.cart.push(response.data);

        toast.success("Added to Cart");
    }
},
async increaseQuantity(cartId) {

    const index = this.cart.findIndex(
        item => item.id === cartId
    );

    if (index === -1) return;

    const cartItem = { ...this.cart[index] };

    cartItem.quantity++;

    const response = await api.put(
        `/cart/${cartId}`,
        cartItem
    );

    this.cart[index] = response.data;

    toast.success("Quantity Updated");
},
async decreaseQuantity(cartId) {

    const index = this.cart.findIndex(
        item => item.id === cartId
    );

    if (index === -1) return;

    const cartItem = { ...this.cart[index] };

    if (cartItem.quantity > 1) {

        cartItem.quantity--;

        const response = await api.put(
            `/cart/${cartId}`,
            cartItem
        );

        this.cart[index] = response.data;

        toast.success("Quantity Updated");

    } else {

        await this.removeFromCart(cartId);

    }
},

        async removeFromCart(id) {

    await api.delete(`/cart/${id}`);

    this.cart = this.cart.filter(
        item => item.id !== id
    );

    toast.success("Removed from cart");
},
async clearcart(id)
{
    console.log("calling clearcart");
    const response=await api.get('/cart',{
        params:
        {
            userId:id
        }
    });
    const cartitems=response.data;

    for (const item of cartitems)
    {
        await api.delete(`/cart/${item.id}`);
    }
    this.cart=[];
}
    }
});