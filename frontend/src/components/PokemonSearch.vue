<template>
  <div class="pokemon-search">
    <input
      type="text"
      v-model="searchQuery"
      @input="searchPokemon"
      placeholder="Search Pokémon by name..."
    />
    <div class="owned-checkbox">
      <input
        type="checkbox"
        id="show-owned"
        v-model="showOwned"
        @change="toggleOwnedPokemons"
      />
      <label for="show-owned">Show only owned Pokémon</label>
    </div>
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
import { useAuthStore } from "@/stores/authStore.js";

const authStore = useAuthStore();

// Initialize reactive data
const searchQuery = ref("");
const pokemons = ref([]);
const ownedPokemons = ref([]);
const filteredPokemons = ref([]);
const loading = ref(false);
const error = ref("");
const showOwned = ref(false);

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

// Fetch owned Pokémon for the current user
const fetchOwnedPokemons = async () => {
  loading.value = true;
  error.value = "";
  try {
    const response = await axios.post(
      "http://localhost:3000/api/owned-pokemons",
      { userId: authStore.userId }
    );
    ownedPokemons.value = response.data.pokemons;
  } catch (err) {
    console.error("Error fetching owned Pokémon:", err);
    error.value = "Failed to fetch owned Pokémon.";
  } finally {
    loading.value = false;
  }
};

// Function to search Pokémon by name
const searchPokemon = () => {
  const query = searchQuery.value.trim().toLowerCase();
  if (!query) {
    filteredPokemons.value = showOwned.value ? ownedPokemons.value : [];
    return;
  }

  const listToFilter = showOwned.value ? ownedPokemons.value : pokemons.value;
  const sliceSize = showOwned.value ? 1000 : 10;

  filteredPokemons.value = listToFilter
    .filter((pokemon) => pokemon.name.includes(query))
    .slice(0, sliceSize); // Limiting to 10 results if unowned search, limiting to "infinite" if owned search
};

// Toggle owned Pokémon
const toggleOwnedPokemons = async () => {
  if (showOwned.value) {
    // Fetch owned Pokémon if checkbox is checked
    await fetchOwnedPokemons();
  }
  // Perform search with updated state
  searchPokemon();
};

// Watch for changes in searchQuery to trigger searchPokemon
watch([searchQuery, showOwned], () => {
  searchPokemon();
});

// Fetch all Pokémon on component mount
onMounted(() => {
  fetchAllPokemons();
});
</script>

<style scoped></style>
