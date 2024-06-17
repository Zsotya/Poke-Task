<template>
  <div class="login-form">
    <h2>Login</h2>
    <form @submit.prevent="loginUser">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useAuthStore } from "@/stores/authStore.js";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

// Initialize data
const username = ref("");
const password = ref("");
const error = ref(null);

// Login function
const loginUser = async () => {
  try {
    // Send credentials to "POST /api/login" endpoint
    const response = await axios.post("http://localhost:3000/api/login", {
      username: username.value,
      password: password.value,
    });
    const token = response.data.token;
    const userId = response.data.userId;

    // Handle successful login: Store token in Pinia store, redirect to Home page
    console.log("Login successful");
    authStore.setToken(token, userId);
    router.push("/");
  } catch (err) {
    // Error handling
    console.error("Error logging in:", err.response.data.error);
    error.value = err.response.data.error;
  }
};
</script>

<style scoped></style>
