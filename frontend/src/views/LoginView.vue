<template>
  <div class="page-container">
    <div class="login-form">
      <h2 class="title">Enter your credentials, Trainer!</h2>
      <form @submit.prevent="loginUser">
        <div class="input-container">
          <label class="input-label" for="username">Username:</label>
          <input
            class="input-field"
            type="text"
            id="username"
            v-model="username"
            required
          />
        </div>
        <div class="input-container">
          <label class="input-label" for="password">Password:</label>
          <input
            class="input-field"
            type="password"
            id="password"
            v-model="password"
            required
          />
        </div>
        <button class="form-button" type="submit">
          <img src="@/assets/pokeball.png" alt="Register" class="icon" />
          <span>Login</span>
        </button>
        <Transition name="fade" appear>
          <p v-if="error" class="error">{{ error }}</p>
        </Transition>
      </form>
    </div>
    <div class="register-nav">
      <h3>Don't have an account?</h3>
      <RouterLink to="/register" class="form-button">
        <img src="@/assets/pokeball.png" alt="Register" class="icon" />
        <span>Create an account!</span>
      </RouterLink>
    </div>
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

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 91vh;
  background-color: #e8ba01;
  padding-top: 22vh;
  font-family: "Press Start 2P", cursive;
  font-size: 24px;
}

.login-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.title {
  margin-bottom: 36px;
}

.input-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-label {
  font-weight: bold;
}

.input-field {
  width: 22ch;
  height: 32px;
  margin-bottom: 10px;
  font-size: 24px;
  border: none;
  border-bottom: 2px solid rgb(0, 0, 0);
  background-color: #e8ba01;
}

.input-field:focus {
  outline: none;
}

.form-button {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 10px 20px;
  margin: 10px 0px;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s;
  font-family: "Press Start 2P", cursive;
  text-decoration: none;
  width: 100%;
}

.form-button {
  background-color: #3b4cca;
  color: #ffcb05;
  border: 2px solid #ffcb05;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.form-button:hover {
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
  transform: scale(1.1);
}

.icon {
  width: 25px;
  height: 25px;
  margin-right: 10px;
  transition: transform 0.3s;
}

.form-button:hover .icon {
  transform: rotate(-360deg);
}

.error {
  color: red;
  font-size: 18xp;
}

.fade-enter-active {
  transition: opacity 0.5s;
}

.fade-enter-from {
  opacity: 0;
}

.fade-enter-to {
  opacity: 1;
}
</style>
