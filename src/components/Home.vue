<script setup>
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/userStore";
import { useProductStore } from "../stores/productStore";
import { useCartStore } from "../stores/cartStore";
const router = useRouter();
const userStore = useUserStore();
const productStore = useProductStore();
const cartStore = useCartStore();
function addtocart(product) {
    if (!userStore.currentUser) 
    {
        alert("Log in!!!");
        router.push("/login");
        return;
    }
    cartStore.addToCart(product);
    alert("Added to cart");
}
</script>
<template>
    <center>
<br>
<h1>Products List</h1>

<div v-if="productStore.filterproduct.length>0 " class="product-container">
<div
class="product-card" v-for="product in productStore.filterproduct" :key="product.id">

<img :src="product.image">

<h3>{{ product.name }}</h3>
<p><b>Category:</b> {{ product.category }}</p>
<p><b>Price:</b> ₹{{ product.price }}</p>
<button @click="addtocart(product)">Add To Cart</button>
</div>
</div>

<div v-else>
    <h2>Products not found</h2>
</div>

</center>
</template>