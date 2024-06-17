<template>
  <div class="pokemon-types">
    <label for="types">Choose a Pokémon type:</label>
    <select
      id="types"
      v-model="selectedType"
      @change="fetchPokemons"
      :disabled="loading"
    >
      <option value="" disabled>Select a type</option>
      <option v-for="type in types" :key="type.name" :value="type.name">
        {{ capitalizeFirstLetter(type.name) }}
      </option>
    </select>

    <div v-if="loading" class="loading">Loading Pokémon...</div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="pokemons.length > 0 && !loading" class="pokemon-list">
      <h2>{{ capitalizeFirstLetter(selectedType) }} Pokémon</h2>
      <ul>
        <li v-for="pokemon in pokemons" :key="pokemon.name">
          <router-link :to="`/pokemon/${pokemon.name}`">
            {{ capitalizeFirstLetter(pokemon.name) }}</router-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";

// Initialize reactive data
const types = ref([]);
const selectedType = ref("");
const pokemons = ref([]);
const loading = ref(false);
const error = ref("");

// Capitalize first letter of the names
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// Function to fetch Pokémon types
const fetchPokemonTypes = async () => {
  loading.value = true;
  error.value = "";
  try {
    const response = await axios.get("https://pokeapi.co/api/v2/type");
    types.value = response.data.results;
  } catch (err) {
    console.error("Error fetching Pokémon types:", err);
    error.value = "Failed to fetch Pokémon types.";
  } finally {
    loading.value = false;
  }
};

// Fetch all Pokémons of the selected type
const fetchPokemons = async () => {
  if (!selectedType.value) return;
  loading.value = true;
  error.value = "";
  pokemons.value = [];

  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/type/${selectedType.value}`
    );
    pokemons.value = response.data.pokemon.map((p) => p.pokemon);
  } catch (err) {
    console.error(`Error fetching Pokémon of type ${selectedType.value}:`, err);
    error.value = `Failed to fetch Pokémon of type ${selectedType.value}.`;
  } finally {
    loading.value = false;
  }
};

// Fetch Pokémon types when the component is mounted
onMounted(() => {
  fetchPokemonTypes();
});

// Watch for changes in selectedType to fetchPokemons
watch(selectedType, () => {
  fetchPokemons();
});
</script>
