<template>
  <div class="logged-out-view" v-if="!loggedIn">
    <HomeLoggedOut />
  </div>
  <div class="logged-in-view" v-else>
    <HomeLoggedIn />
  </div>
</template>

<script setup>
import HomeLoggedOut from "@/components/HomeLoggedOut.vue";
import HomeLoggedIn from "@/components/HomeLoggedIn.vue";

const loggedIn = false;
</script>

<style scoped></style>
