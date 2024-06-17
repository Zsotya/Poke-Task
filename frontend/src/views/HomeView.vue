<template>
  <div class="logged-out-view" v-if="!isLoggedIn">
    <HomeLoggedOut />
  </div>
  <div class="logged-in-view" v-else>
    <HomeLoggedIn />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useAuthStore } from "@/stores/authStore";
import HomeLoggedOut from "@/components/HomeLoggedOut.vue";
import HomeLoggedIn from "@/components/HomeLoggedIn.vue";

// Check if the user is logged in via auth store
const authStore = useAuthStore();
const isLoggedIn = computed(() => !!authStore.token);
</script>

<style scoped></style>
