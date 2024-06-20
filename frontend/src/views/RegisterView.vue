<template>
  <div class="page-container">
    <div class="register-form">
      <h2 class="title">Let's become a Trainer!</h2>
      <form @submit.prevent="registerUser">
        <div class="input-container">
          <label class="input-label" for="username">Username</label>
          <input
            class="input-field"
            type="text"
            id="username"
            v-model="formData.username"
            required
          />
        </div>
        <div class="input-container">
          <label class="input-label" for="email">Email</label>
          <input
            class="input-field"
            type="email"
            id="email"
            v-model="formData.email"
            required
          />
        </div>
        <div class="input-container">
          <label class="input-label" for="password">Password</label>
          <input
            class="input-field"
            type="password"
            id="password"
            v-model="formData.password"
            required
          />
        </div>
        <button class="form-button" type="submit">
          <img src="@/assets/pokeball.png" alt="Register" class="icon" />
          <span>Register</span>
        </button>
      </form>
      <div class="success" v-if="success">
        Registration successful! Redirecting to login page...
      </div>
    </div>
    <div class="login-nav">
      <h3>Already have an account?</h3>
      <RouterLink to="/login" class="form-button">
        <img src="@/assets/pokeball.png" alt="Login" class="icon" />
        <span>Login</span>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const success = ref(false);

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
    // Success handling: Display success message, then push to login page
    success.value = true;
    setTimeout(() => {
      router.push("/login");
    }, 3000);
  } catch (error) {
    // Error handling
    console.error("Error registering user:", error.response.data);
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

.register-form {
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
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s;
  font-family: "Press Start 2P", cursive;
  text-decoration: none;
  width: 100%;
  max-width: 26ch;
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

.login-nav {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
