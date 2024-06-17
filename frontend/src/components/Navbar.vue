<template>
  <nav class="navbar">
    <RouterLink to="/">Home</RouterLink>
    <div class="auth-links" v-if="!isLoggedIn">
      <RouterLink to="/login">Login</RouterLink>
      <RouterLink to="/register">Register</RouterLink>
    </div>
    <div class="user-menu" v-else>
      <div>Hello user</div>
      <button @click="authStore.clearToken()">Logout</button>
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
}
</style>
