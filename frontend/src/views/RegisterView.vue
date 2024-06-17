<template>
  <div class="register-form">
    <h2>Register</h2>
    <form @submit.prevent="registerUser">
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="formData.username" required />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="formData.email" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          v-model="formData.password"
          required
        />
      </div>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";

// Initialize form data
const formData = ref({
  username: "",
  email: "",
  password: "",
});

// Registration function
const registerUser = async () => {
  try {
    // Send credentials to "POST /api/register" endpoint
    const response = await axios.post("http://localhost:3000/api/register", {
      username: formData.value.username,
      email: formData.value.email,
      password: formData.value.password,
    });
    // Success handling
    console.log("Registration successful:", response.data);
  } catch (error) {
    // Error handling
    console.error("Error registering user:", error.response.data);
  }
};
</script>

<style scoped></style>
