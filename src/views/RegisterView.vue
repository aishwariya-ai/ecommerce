<script setup>
import {ref} from 'vue';
import {useUserStore} from '../stores/userStore.js';
import { useRouter } from "vue-router";
import { useToast } from 'vue-toastification';
import { inject } from "vue"
const rules = inject("rules");
const toast=useToast();
const router = useRouter();
const userStore=useUserStore();
const username=ref("");
const email=ref("");
const password=ref("");
const phone = ref("");
const gender = ref("");
const city = ref("");
const role=ref("");
const form =ref();

const passwordrules = 
  v => v.length >= 6 || "Password must be at least 6 characters"
;

const rolerules = [
  v => !!v || "Please select a role"]
;
const phonerules = 
  v => /^\d{10}$/.test(v) || "Phone number must contain exactly 10 digits"
;

const genderrules = [
  v => !!v || "Please select a gender"
];

const cityrules = 
  v => v.length >= 3 || "City must contain at least 3 characters"
;


async function register() {
    const {valid}=await form.value.validate();
    if(!valid)return;
    await userStore.registerUser({
        username: username.value,
        email: email.value,
        password: password.value,
        role: role.value
    });
    toast.success("Registration Successful");
    router.push('/login');
    form.value.reset();
}

</script>
<template>
    <v-container class="d-flex justify-center align-center">
        <v-card width="400" class="p-6 elevation-5" >
            <v-card-title class="text-h4 text-center mb-4 "> Registration</v-card-title>
            <v-form ref="form">
            <v-card-text>
<v-text-field
    type="text"
    label="Username"
    v-model="username"
    variant="outlined"
    :rules="[rules.required]"
/>


<v-text-field
    type="email"
    label="Email"
    v-model="email"
    variant="outlined"
    :rules="[rules.required,rules.email]"
/>


<v-text-field
    type="password"
    label="Password"
    v-model="password"
    variant="outlined"
    :rules="[rules.required,passwordrules]"
/>
<v-text-field
    type="phone"
    label="Mobile No"
    v-model="phone"
    variant="outlined"
    :rules="[rules.required,phonerules]"
/>

<v-select v-model="gender"
label="Gender"
:items="['Male','Female','Others']"
variant="outlined"
:rules="genderrules"
/>

<v-text-field
    type="text"
    label="City"
    v-model="city"
    variant="outlined"
    :rules="[rules.required,cityrules]"
/>

<v-select v-model="role"
label="Role"
:items="['user','admin']"
variant="outlined"
:rules="rolerules"
/>
<v-card-actions class="justify-center">
<v-btn color="primary" variant="flat" class="mt-2 px-10" @click="register">Register</v-btn>
</v-card-actions>
<div class="text-center mt-4">
      Already have an account?
      <RouterLink to="/login">Login</RouterLink>
</div>
    </v-card-text>
    </v-form>
</v-card>
</v-container>
</template>