<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/userStore";
import { useToast} from "vue-toastification";
import {inject} from 'vue'
const rules=inject("rules");
const toast=useToast();
const router = useRouter();
const userStore = useUserStore();

const username = ref("");
const password = ref("");

const passwordrules =
  v => v.length >= 6 || "Password must be at least 6 characters"
;
async function login() {
    const success = await userStore.login(
        username.value,
        password.value
    );

    if (success) {
        toast.success("Login Successful");
        router.push("/");
    } else {
        toast.error("Invalid Username or Password");
    }
}
</script>

<template>
<v-container class=" d-flex justify-center align-center">
    <v-card width="400" class="p-6 elevation5">

        <v-card-title class="text-h4 text-center mb-4"> Login </v-card-title>
        <v-card-text>
        <v-text-field
            type="text"
            label="Enter Username"
            v-model="username"
            variant="outlined"
            :rules="[rules.required]"
        />

        <v-text-field
            type="password"
            label="Enter Password"
            v-model="password"
            variant="outlined"
            :rules="[rules.required,passwordrules]"
        />
            <v-card-actions class="justify-center">
        <v-btn color ="primary"  variant="flat" class="mt-2 px-10 " @click="login">Login</v-btn>
        </v-card-actions>
        <div class="text-center mt-4">
      Don't have an account?
      <RouterLink to="/register">Register</RouterLink>
        </div>
    </v-card-text>
    </v-card>
    </v-container>
</template>