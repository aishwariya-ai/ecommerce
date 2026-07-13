<script setup>

import {ref,watch} from 'vue';
import {inject} from 'vue';
const rules=inject("rules");
const props=defineProps({
    product:Object

});

const emit=defineEmits(['save']);
const form=ref();
const name= ref("");
const category=ref("");
const price=ref(null);
const brand=ref("");
const description=ref("");

const pricerules=[
    v=>v !== null||"Price is required",
    v=>v > 0||"price must greater than 0"
]
watch (
    ()=>props.product,
    (value)=>{
        if(value)
    {
        name.value=value.name;
        category.value=value.category;
        price.value=value.price;
        brand.value=value.brand;
        description.value=value.description;
    }
    else{

        name.value="";
        category.value="";
        price.value="";
        brand.value="";
        description.value="";
    }
    },
    {immediate:true}
);

async function submit()
{
    const{valid}=await form.value.validate();
    if(!valid) return;
    emit('save',{
        id:props.product?.id,
        name:name.value,
        category:category.value,
        price:price.value,
        brand:brand.value,
        description:description.value
    });
    form.value.reset();
}
</script>
<template>
            <v-form ref="form">
          <v-row class="d-flex justify-center ">
            <v-col cols="12" md="4">
              <v-text-field
                label="Product Name"
                v-model="name"
                variant="outlined"
                :rules="[rules.required]"
              />
            </v-col>
            
          </v-row>
          <v-row class="d-flex justify-center">

            <v-col cols="12" md="4">
              <v-text-field
                label="Category"
                v-model="category"
                variant="outlined"
                :rules="[rules.required]"
              />
            </v-col>
            </v-row>
            <v-row class="d-flex justify-center">
            <v-col cols="12" md="4">
              <v-text-field
                label="Price"
                type="number"
                v-model.number="price"
                variant="outlined"
                :rules="pricerules"
              />
            </v-col>
          </v-row>
          <v-row class="d-flex justify-center">
            <v-col cols="12" md="4">
              <v-text-field
                label="Brand"
                type="text"
                v-model="brand"
                variant="outlined"
                :rules="[rules.required]"
              />
            </v-col>
          </v-row>

        <v-row class="d-flex justify-center">
            <v-col cols="12" md="4">
              <v-text-field
                label="Description"
                type="text"
                v-model="description"
                variant="outlined"
                :rules="[rules.required]"
              />
            </v-col>
          </v-row>



          <v-row class="mb-4">
            <v-col cols="12" class="d-flex justify-center">
              <v-btn
                color="primary"
                
                @click="submit"
              >
                {{ props.product ? " Update Product" : "Add Product" }}
              </v-btn>
            </v-col>
          </v-row>
</v-form>
</template>