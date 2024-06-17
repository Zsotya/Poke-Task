<template>
  <div class="greeting">
    <Greeting />
  </div>
  <div class="search-bar">
    <PokemonSearch />
  </div>
  <div class="type-selector">
    <PokemonTypeSelector />
  </div>
</template>

<script setup>
import Greeting from "@/components/Greeting.vue";
import PokemonTypeSelector from "@/components/PokemonTypeSelector.vue";
import PokemonSearch from "@/components/PokemonSearch.vue";
</script>

<style scoped></style>
