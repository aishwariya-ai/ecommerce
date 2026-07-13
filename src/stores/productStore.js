import { defineStore } from "pinia";
import api from '../api/api.js';
import {useToast} from "vue-toastification";
const toast=useToast();

export const useProductStore = defineStore("product",{
    state:()=>({
        products: [],
        search:"",
        sortBy:""
    }),
    getters: {},
    actions: {
        async getProducts()
        {
            const cache=localStorage.getItem("products");
            if(cache)
            {
                this.products=JSON.parse(cache);
                console.log("Loaded from cache");
            }
            
            console.log("Loaded via API")
            const response=await api.get("/products");
            this.products=response.data;
            localStorage.setItem("products",JSON.stringify(this.products));


        },

        async addProduct(product)
         {
            product.id = this.products.length===0 ? 1 : String(Math.max(...this.products.map(p => Number(p.id))) + 1);
            const response= await api.post("/products",product);
            this.products.push(response.data)
             toast.success("Product added!!!")

            
        },
        async updateProduct(updatedProduct) 
        {

        const response = await api.put(`/products/${updatedProduct.id}`, updatedProduct);
            const index = this.products.findIndex(
                product => product.id === response.data.id
            );
            console.log(index);
            if (index !== -1) {
                this.products[index].name = response.data.name;
                this.products[index].category = response.data.category;
                this.products[index].price = response.data.price;
                this.products[index].brand = response.data.brand;
                this.products[index].description = response.data.description;

            }
             toast.success("Product updated!!!")

        },
        async deleteProduct(id) {
            await api.delete(`/products/${id}`);
            this.products = this.products.filter(
                product => product.id !== id);
             toast.success("Product deleted!!!")

        },
        async fetchProducts()
        {
            let params={};
            if(this.search)
            {
                params.name_like=this.search;
            }
            switch(this.sortBy)
            {
                case 'priceLow':
                    params._sort="price";
                    params._order="asc";
                    break;
                case 'priceHigh':
                    params._sort="price";
                    params._order="desc";
                    break;
            }
            const response=await api.get("/products",{params});
            this.products=response.data;
        }
    }
});