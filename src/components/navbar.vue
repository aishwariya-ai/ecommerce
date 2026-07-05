<script setup>
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/userStore";
import { useProductStore } from "../stores/productStore";
const router = useRouter();
const userStore = useUserStore();
const productStore = useProductStore();
function goHome()
{
    router.push("/");
}
function goCart() 
{
    router.push("/cart");
}
function goLogin() 
{
    router.push("/login");
}
function goManageProduct() 
{
    router.push("/manageproduct");
}
function logout() 
{
    userStore.logout();
    alert("Logged Out Successfully");
    router.push("/");

}
</script>
<template>
<nav class="navbar">

    <div class="nav-links">
        <button @click="goHome">Home</button>
        <button @click="goCart">Cart</button>

        <button
            v-if="userStore.currentUser?.role==='admin'"
            @click="goManageProduct">
            Manage Products
        </button>
    </div>

    <div class="nav-search">

        <input
            type="text"
            placeholder="Search products"
            v-model="productStore.search"
        >

        <select v-model="productStore.sortBy">
            <option value="">Sort</option>
            <option value="priceLow">Low->High</option>
            <option value="priceHigh">High->Low</option>
        </select>

    </div>

    <div class="nav-user">

        <span v-if="userStore.currentUser">
            {{ userStore.currentUser.username }}
        </span>

        <button
            v-if="!userStore.currentUser"
            @click="goLogin">
            Login
        </button>

        <button
            v-else
            @click="logout">
            Logout
        </button>

    </div>

</nav>
</template>