<script setup>
import { onMounted } from "vue";
import { useCartStore } from "../stores/cartStore";
import { useUserStore } from "../stores/userStore";
const userStore = useUserStore();
const cartStore = useCartStore();
onMounted(() => {
    if (userStore.currentUser) {
        cartStore.getCart(userStore.currentUser.id);
    }
});
</script>
<template>
    <center>
        <br>
<h1>My Cart</h1>
<div v-if="cartStore.cart.length===0">
<h2>No Products In Cart</h2>
</div>
<table v-else >
<tr>
<th>Name</th>
<th>Category</th>
<th>Price</th>
<th>Action</th>
</tr>
<tr
v-for="product in cartStore.cart" :key="product.id">

<td>{{ product.name }}</td>
<td>{{ product.category }}</td>
<td>{{ product.price }}</td>
<td>
<button @click="cartStore.removeFromCart(product.id)"> Remove </button>
</td>
</tr>
</table>
<br>
<h3>Total Products: {{ cartStore.totalcount }}</h3>
<br>
<h2>Total Amount: {{ cartStore.total }}</h2>
</center>
</template>