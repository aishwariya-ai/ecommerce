<script setup>
import {ref} from 'vue';
import {useUserStore} from '../stores/userStore.js';
import { useRouter } from "vue-router";
const router = useRouter();
const userStore=useUserStore();
const username=ref("")
const email=ref("")
const password=ref("")
const role=ref("")
 
const errors = ref({
    username: "",
    email: "",
    password: "",
    role: ""
});
async function register() {
    if (!validateForm()) return;

    await userStore.registerUser({
        username: username.value,
        email: email.value,
        password: password.value,
        role: role.value
    });

    alert("Registration Successful");
    router.push('/login')
}

function validateForm() {
    errors.value = {
        username: "",
        email: "",
        password: "",
        role: ""
    };

    let valid = true;

    if (!username.value) {
        errors.value.username = "Username is required";
        valid = false;
    } 
    if (!email.value) {
        errors.value.email = "Email is required";
        valid = false;
    } else if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)
    ) {
        errors.value.email = "Enter a valid email";
        valid = false;
    }

    if (!password.value) {
        errors.value.password = "Password is required";
        valid = false;
    } else if (password.value.length < 6) {
        errors.value.password = "Password must be at least 6 characters";
        valid = false;
    }

    if (!role.value) {
        errors.value.role = "Please select a role";
        valid = false;
    }

    return valid;
}

</script>
<template>
    <center>
        <br>
        <h1>Registration</h1>
<input
    type="text"
    placeholder="Username"
    v-model="username"
/>
<p class="error">{{ errors.username }}</p>

<input
    type="email"
    placeholder="Email"
    v-model="email"
/>
<p class="error">{{ errors.email }}</p>

<input
    type="password"
    placeholder="Password"
    v-model="password"
/>
<p class="error">{{ errors.password }}</p>

<select v-model="role">
    <option value="">Select Role</option>
    <option value="user">User</option>
    <option value="admin">Admin</option>
</select>
<p class="error">{{ errors.role }}</p>
<br>
<button @click="register">Register</button>
<br>
<p>
      Already have an account?
      <RouterLink to="/login">Login</RouterLink>
    </p>
</center>
</template>