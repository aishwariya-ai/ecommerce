<script setup>
import { ref } from "vue";
import { useProductStore } from "../stores/productStore";
import ProductForm from "../components/ProductForm.vue";
import ProductTable from "../components/ProductTable.vue";
const productStore = useProductStore();
const selectedProduct = ref(null);
function saveProduct(product) {
  if (product.id) {
    productStore.updateProduct(product);
  } else {
    productStore.addProduct(product);
  }

  selectedProduct.value = null;
}

function editProduct(product) {
  selectedProduct.value = product;
}

function deleteProduct(id) {
  productStore.deleteProduct(id);
}
</script>

<template>
<v-container fluid>

<v-row justify="center">

<v-col cols="12" md="10">

<v-card class="pa-6">

<v-card-title class="text-h4 text-center">
Manage Products
</v-card-title>

<ProductForm
    :product="selectedProduct"
    @save="saveProduct"
/>

<ProductTable
    :products="productStore.products"
    @edit="editProduct"
    @delete="deleteProduct"
/>

</v-card>

</v-col>

</v-row>

</v-container>

</template>