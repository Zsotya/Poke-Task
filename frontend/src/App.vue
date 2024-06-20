<script setup>
import { RouterLink, RouterView } from "vue-router";
import Navbar from "@/components/Navbar.vue";
</script>

<template>
  <nav class="nav-container">
    <Navbar />
  </nav>
  <main class="main-container">
    <RouterView />
  </main>
</template>

<style scoped></style>
