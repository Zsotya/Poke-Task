import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    // Retrieve token from local storage if exists
    token: localStorage.getItem("authToken") || null,
    userId: localStorage.getItem("userId") || null,
  }),

  actions: {
    setToken(token, userId) {
      // Store token in local storage
      this.token = token;
      localStorage.setItem("authToken", token);
      // Store user's ID in local storage
      this.userId = userId;
      localStorage.setItem("userId", userId);
    },

    clearToken() {
      // Remove token, remove from local storage
      this.token = null;
      localStorage.removeItem("authToken");
      // Remove userId from localStorage
      this.userId = null;
      localStorage.removeItem("userId");
    },
  },
});
