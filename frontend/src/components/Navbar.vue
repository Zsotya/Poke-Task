<template>
  <nav class="navbar">
    <RouterLink to="/">Home</RouterLink>
    <div class="auth-links" v-if="!loggedIn">
      <RouterLink to="/login">Login</RouterLink>
      <RouterLink to="/register">Register</RouterLink>
    </div>
    <div class="user-menu" v-else>
      <span>Hello {{ user.name }}</span>
    </div>
  </nav>
</template>

<script setup>
const loggedIn = false;
const user = {
  name: "TestName",
};
</script>

<style scoped>
.navbar {
  display: flex;
}
</style>
