<script setup>
import Navbar from "./components/navbar.vue";
import {useCartStore} from './stores/cartStore.js';
import { useRoute } from "vue-router";
import {provide} from 'vue';
const route = useRoute();
const cartStore=useCartStore();
provide("currency","₹");

cartStore.$subscribe((mutation,state)=>
{
  console.log("store updated");
  console.log(mutation);
  console.log(state);
})

</script>

<template>
  <v-app>
  <Navbar
    v-if=" route.path !== '/login' && route.path !== '/register' " />
  <v-main>
  <router-view />
  </v-main>
  </v-app>
</template>

