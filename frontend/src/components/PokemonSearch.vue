<template>
  <div class="pokemon-search">
    <input
      type="text"
      v-model="searchQuery"
      @input="searchPokemon"
      placeholder="Search Pokémon by name..."
    />
    <ul v-if="filteredPokemons.length > 0" class="pokemon-list">
      <li v-for="pokemon in filteredPokemons" :key="pokemon.name">
        <router-link :to="`/pokemon/${pokemon.name}`">
          {{ capitalizeFirstLetter(pokemon.name) }}
        </router-link>
      </li>
    </ul>
    <p v-else-if="searchQuery && !loading">No Pokémon found with that name.</p>
    <p v-if="loading" class="loading">Searching...</p>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import axios from "axios";

// Initialize reactive data
const searchQuery = ref("");
const pokemons = ref([]);
const filteredPokemons = ref([]);
const loading = ref(false);
const error = ref("");

// Capitalize first letter of the names
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// Function to fetch all Pokémon initially
const fetchAllPokemons = async () => {
  loading.value = true;
  error.value = "";
  try {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=1000"
    );
    pokemons.value = response.data.results;
  } catch (err) {
    console.error("Error fetching Pokémon:", err);
    error.value = "Failed to fetch Pokémon data.";
  } finally {
    loading.value = false;
  }
};

// Function to search Pokémon by name
const searchPokemon = () => {
  const query = searchQuery.value.trim().toLowerCase();
  if (!query) {
    filteredPokemons.value = [];
    return;
  }

  filteredPokemons.value = pokemons.value
    .filter((pokemon) => pokemon.name.includes(query))
    .slice(0, 10); // Limiting to 10 results
};

// Watch for changes in searchQuery to trigger searchPokemon
watch(searchQuery, () => {
  searchPokemon();
});

// Fetch all Pokémon on component mount
onMounted(() => {
  fetchAllPokemons();
});
</script>

<style scoped></style>
