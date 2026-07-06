<script setup>
import Navbar from "./components/navbar.vue";
import {useCartStore} from './stores/cartStore.js'
const cartStore=useCartStore();

cartStore.$subscribe((mutation,state)=>
{
  console.log("store updated");
  console.log(mutation);
  console.log(state);
})

</script>

<template>
  <Navbar />
  <router-view />
</template>

