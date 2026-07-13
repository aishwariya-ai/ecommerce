<script setup>
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/userStore";
import { useProductStore } from "../stores/productStore";
import { useCartStore } from "../stores/cartStore";
import { useToast } from "vue-toastification";
import productcard from "../components/productcard.vue";
import { inject } from "vue";
const router = useRouter();
const userStore = useUserStore();
const productStore = useProductStore();
const cartStore = useCartStore();
const toast=useToast();
const currency=inject("currency");
productStore.$subscribe((mutation,state) => 
{
  console.log("HomeView Loaded");
  localStorage.setItem( "products",JSON.stringify(state.products));
  console.log("Product Store Changed")
}
,{detached:true}
);


function throttle (fn,delay){

  let waiting=false
  return(...args)=>
{
    console.log("button is clicked");
  if(waiting){
    console.log("Ignored");
    return }
    console.log("Added to cart");
  fn(...args);
  waiting=true;
  setTimeout(()=>
  {
   waiting=false},delay);
};
}

const throttledfunction=throttle(addtocart,1000);


function addtocart(product) {
  if (!userStore.currentUser) {
    toast.warning("Log in!!!");
    router.push("/login");
    return;
  }

  cartStore.addToCart(product,userStore.currentUser.id);
}
</script>

<template>
  <v-container fluid class="pa-6">

    <h1 class="text-h3 font-weight-bold mb-6">
      Products List 
    </h1>

    <v-row v-if="productStore.products.length > 0">
      <v-col
      cols="12"
        v-for="product in productStore.products"
        :key="product.id">
        <productcard>
          <template #image>
          <v-img
            :src="product.image"
            height="200"
            contain></v-img>
            </template>

          <template #title> {{ product.name }} </template>

            <p>
              <strong>Category :</strong>
              {{ product.category }}
            </p>

            <p class="text-h6 text-primary">
              {{currency}}{{ product.price }}
            </p>
            <p>
              <strong>Brand :</strong>
              {{ product.brand }}
            </p>
            <p>
              <strong>Description :</strong>
              {{ product.description }}
            </p>


          <template #actions>

            <v-btn color="primary" variant="flat" @click="throttledfunction(product)">
    Add to Cart
</v-btn>

          </template>

        </productcard>

      </v-col>

    </v-row>

    <v-row v-else justify="center">

      <v-col cols="12">

        <v-alert
          type="warning"
          variant="tonal"
        >
          Products not found
        </v-alert>

      </v-col>

    </v-row>

  </v-container>
</template>