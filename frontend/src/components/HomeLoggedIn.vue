<template>
  <div class="greeting">
    <Greeting />
  </div>
  <div class="type-selector">
    <PokemonTypeSelector />
  </div>
</template>

<script setup>
import Greeting from "@/components/Greeting.vue";
import PokemonTypeSelector from "@/components/PokemonTypeSelector.vue";
</script>

<style scoped></style>
