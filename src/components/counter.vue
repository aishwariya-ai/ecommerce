<script setup>
import {useCounterstore} from '../stores/counter';
const counter=useCounterstore();
counter.$subscribe((mutation,state)=>{
    console.log("Store Changed");
    console.log(mutation);
    console.log(state);
})
</script>
<template>
    <button @click="counter.increment">Increment</button>
</template>