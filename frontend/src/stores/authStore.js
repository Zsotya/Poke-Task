import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    // Retrieve token from local storage if exists
    token: localStorage.getItem("authToken") || null,
  }),

  actions: {
    setToken(token) {
      // Store token in local storage
      this.token = token;
      localStorage.setItem("authToken", token);
    },

    clearToken() {
      // Remove token, remove from local storage
      this.token = null;
      localStorage.removeItem("authToken");
    },
  },
});
