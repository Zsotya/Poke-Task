<template>
  <nav class="navbar">
    <RouterLink to="/" class="logo-link">
      <img src="@/assets/pokemon-logo.png" alt="Pokémon Logo" class="logo" />
    </RouterLink>
    <div class="auth-links" v-if="!isLoggedIn">
      <RouterLink to="/login" class="nav-link login-btn">
        <img src="@/assets/pokeball.png" alt="Login" class="nav-icon" />
        <span>Login</span>
      </RouterLink>
      <RouterLink to="/register" class="nav-link register-btn">
        <img src="@/assets/pokeball.png" alt="Register" class="nav-icon" />
        <span>Register</span>
      </RouterLink>
    </div>
    <div class="user-menu" v-else>
      <span class="user-greeting">Hello, Trainer!</span>
      <button @click="authStore.clearToken()" class="logout-btn">
        <img src="@/assets/pokeball.png" alt="Logout" class="nav-icon" />
        Logout
      </button>
    </div>
  </nav>
</template>

<script setup>
import { computed } from "vue";
import { useAuthStore } from "@/stores/authStore";

// Check if the user is logged in via auth store
const authStore = useAuthStore();
const isLoggedIn = computed(() => !!authStore.token);
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 20px;
  background: linear-gradient(45deg, #ffcb05, #3b4cca);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  font-family: "Press Start 2P", cursive;
}

.logo-link {
  display: flex;
  align-items: center;
}

.logo {
  height: 50px;
  margin-left: 10px;
  transition: transform 0.3s;
}

.logo:hover {
  transform: rotate(-5deg) scale(1.1);
}

.auth-links {
  display: flex;
  align-items: center;
}

.nav-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  margin: 0 10px;
  font-weight: bold;
  transition: all 0.3s;
  padding: 10px 20px;
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.login-btn {
  background-color: #3b4cca;
  color: #ffcb05;
  border: 2px solid #ffcb05;
}

.register-btn {
  background-color: #ffcb05;
  color: #3b4cca;
  border: 2px solid #3b4cca;
}

.login-btn:hover,
.register-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.nav-icon {
  width: 25px;
  height: 25px;
  margin-right: 10px;
  transition: transform 0.3s;
}

.nav-link:hover .nav-icon,
.logout-btn:hover .nav-icon {
  transform: rotate(-360deg);
}

.user-menu {
  display: flex;
  align-items: center;
}

.user-greeting {
  margin-right: 10px;
  font-size: 16px;
  color: white;
}

.logout-btn {
  background-color: #d62828;
  color: white;
  border: 2px solid #6b1a1a;
  padding: 10px 20px;
  margin: 0 10px;
  border-radius: 20px;
  display: flex;
  font-weight: bold;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  font-family: "Press Start 2P", cursive;
}

.logout-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}
</style>
