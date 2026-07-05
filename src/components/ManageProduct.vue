<script setup>
import { ref } from "vue";
import { useProductStore } from "../stores/productStore";
const productStore = useProductStore();
const name = ref("");
const category = ref("");
const price = ref("");
const editId = ref(null);
function addProduct() 
{
    if (editId.value === null) {
        productStore.addProduct({
            name: name.value,
            category: category.value,
            price: Number(price.value)
        });
    }
    else {
        productStore.updateProduct({
            id: editId.value,
            name: name.value,
            category: category.value,
            price: Number(price.value)
        });
        editId.value = null;
    }
    name.value = "";
    category.value = "";
    price.value = "";
}
function editProduct(product)
 {
    editId.value = product.id;
    name.value = product.name;
    category.value = product.category;
    price.value = product.price;
}

function deleteProduct(id) 
{
    productStore.deleteProduct(id);
}
</script>
<template>
    <center>
<h1>Manage Products</h1>
<input placeholder="Product Name" v-model="name">
<br>
<input placeholder="Category" v-model="category">
<br>
<input placeholder="Price" v-model="price">
<br>
<button @click="addProduct"> {{ editId===null?"Add Product":"Update Product" }}</button>
<br>
<table>
<tr>
<th>Id</th>
<th>Name</th>
<th>Category</th>
<th>Price</th>
<th>Action</th>
</tr> 
<tr v-for="product in productStore.products" :key="product.id">

<td>{{ product.id }}</td>
<td>{{ product.name }}</td>
<td>{{ product.category }}</td>
<td>{{ product.price }}</td>
<td>
<button @click="editProduct(product)">Edit</button>
<button @click="deleteProduct(product.id)">Delete</button>
</td>
</tr>
</table>
</center>
</template>