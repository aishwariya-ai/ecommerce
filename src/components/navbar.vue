<script setup>
import { watch } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/userStore";
import { useProductStore } from "../stores/productStore";
import { useToast } from "vue-toastification";
const toast=useToast();

const router = useRouter();
const userStore = useUserStore();
const productStore = useProductStore();

function goHome() {
  router.push("/");
}

function goCart() {
  router.push("/cart");
}

function goLogin() {
  router.push("/login");
}

function goManageProduct() {
  router.push("/manageproduct");
}

function logout() {
  userStore.logout();
  toast.success("Logged Out Successfully");
  router.push("/");
}

function debounce(fn,delay)
{
  let timer;
  return(...args)=>
{
console.log("Typing");
clearTimeout(timer)
timer=setTimeout(()=>
{
  fn(...args)
},delay)
}
}
const debouncedSearch=debounce(()=>{
  console.log("Api called")
  productStore.fetchProducts()
},500);

watch(
  ()=>productStore.search,
  ()=>{
    debouncedSearch();
  }
);
watch(
  ()=>productStore.sortBy,
  ()=>{
    productStore.fetchProducts();
  }
);

</script>

<template>

  <v-app-bar
    color="primary"
  >
    <v-toolbar-title
      class="font-weight-bold"
      style="cursor:pointer"
      @click="goHome" >Product Management</v-toolbar-title>

    <v-btn variant="text" @click="goHome">Home</v-btn>

    <v-btn
      variant="text"
      @click="goCart">
      Cart</v-btn>

    <v-btn
      v-if="userStore.currentUser?.role === 'admin'"
      variant="text"
      @click="goManageProduct"
    >
      Manage Products
    </v-btn>

    <v-spacer></v-spacer>

    <v-text-field
      v-model="productStore.search"
      @input="debouncedSearch"
      label="Search"
      variant="outlined"
      density="compact"
      hide-details
      style="max-width:250px"
      class="mr-4"
    ></v-text-field>


    <v-select
      v-model="productStore.sortBy"
      :items="[
        { title: 'Filter', value: '' },
        { title: 'Low → High', value: 'priceLow' },
        { title: 'High → Low', value: 'priceHigh' }
      ]"
      variant="outlined"
      density="compact"
      hide-details
      style="max-width:180px"
      class="mr-4"
    ></v-select>


    <v-chip
      v-if="userStore.currentUser"
      text-color="primary"
      class="mr-3"
    >
      {{ userStore.currentUser.username }}
    </v-chip>
    <v-btn
      v-if="!userStore.currentUser"
      color="white"
      variant="outlined"
      @click="goLogin"
    >
      Login
    </v-btn>

    <v-btn
      v-else
      color="white"
      variant="outlined"
      @click="logout"
    >
      Logout
    </v-btn>

  </v-app-bar>

</template>