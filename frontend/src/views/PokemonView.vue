<template>
  <div class="pokemon-profile" v-if="pokemon">
    <h2>{{ capitalizeFirstLetter(pokemon.name) }}</h2>
    <img
      :src="pokemon.sprites.front_default"
      :alt="pokemon.name"
      class="pokemon-image"
    />
    <p><strong>Height:</strong> {{ pokemon.height / 10 }} m</p>
    <p><strong>Weight:</strong> {{ pokemon.weight / 10 }} kg</p>
    <p>
      <strong>Abilities:</strong>
      <span v-for="ability in abilities" :key="ability" class="ability">
        {{ ability }}
      </span>
    </p>
  </div>
  <p v-else-if="loading" class="loading">Loading...</p>
  <p v-if="error" class="error">{{ error }}</p>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

// Get the current route to access the "name" parameter
const route = useRoute();

// Initialize reactive data
const pokemon = ref(null);
const loading = ref(false);
const error = ref("");

// Capitalize first letter of the names
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// Fetch Pokémon details by name
const fetchPokemon = async (name) => {
  loading.value = true;
  error.value = "";
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );
    pokemon.value = response.data;
  } catch (err) {
    console.error("Error fetching Pokémon:", err);
    error.value = "Failed to fetch Pokémon data.";
  } finally {
    loading.value = false;
  }
};

// Fetch Pokémon data when the component mounts
onMounted(() => {
  fetchPokemon(route.params.name);
});

// Compute non-hidden abilities
const abilities = computed(() => {
  return (
    pokemon.value?.abilities
      .filter((ability) => !ability.is_hidden)
      .map((ability) => capitalizeFirstLetter(ability.ability.name)) || []
  );
});
</script>

<style scoped>
.pokemon-profile {
  text-align: center;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 2px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
}

.pokemon-image {
  width: 150px;
  height: 150px;
}

.ability {
  display: inline-block;
  margin-right: 5px;
  background-color: #e0e0e0;
  border-radius: 5px;
  padding: 2px 5px;
}

.loading {
  text-align: center;
  font-size: 18px;
}

.error {
  text-align: center;
  color: red;
  font-size: 18px;
}
</style>
