import { defineStore } from "pinia";
import api from '../api/api.js';

export const useProductStore = defineStore("product",{
    state:()=>({
        products: [],
        search:"",
        sortBy:""
    }),
    getters: {
        filterproduct(state)
        {
            let filtered= [...state.products].filter(product=>
                product.name.toLowerCase().includes(state.search.toLowerCase())
            );
        switch(state.sortBy)
        {
            case "priceLow":
                return filtered.sort((a,b)=>a.price -b.price);
            case "priceHigh":
                return filtered.sort((a,b)=>b.price -a.price);
            default:
                return filtered;
        }
    }
    },
    actions: {
        async getProducts()
        {
            const response=await api.get("/products");
            this.products=response.data
        },

        async addProduct(product)
         {
            //product.id = this.products.length===0?1:Math.max(...this.products.map(p => p.id)) + 1;
            const response= await api.post("/products",product);
            this.products.push(response.data)
            
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
            }
        },
        async deleteProduct(id) {
            await api.delete(`/products/${id}`);
            this.products = this.products.filter(
                product => product.id !== id
            );
        }
        
    }
});