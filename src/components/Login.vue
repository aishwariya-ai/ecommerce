<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/userStore";

const router = useRouter();
const userStore = useUserStore();

const username = ref("");
const password = ref("");

async function login() {
    const success = await userStore.login(
        username.value,
        password.value
    );

    if (success) {
        alert("Login Successful");
        router.push("/");
    } else {
        alert("Invalid Username or Password");
    }
}
</script>

<template>
    <center>
        <br>

        <h1>Login</h1>

        <input
            type="text"
            placeholder="Enter Username"
            v-model="username"
        />

        <br><br>

        <input
            type="password"
            placeholder="Enter Password"
            v-model="password"
        />

        <br><br>

        <button @click="login">Login</button>
        <br>
        <p>
      Don't have an account?
      <RouterLink to="/register">Register</RouterLink>
    </p>
    </center>
</template>