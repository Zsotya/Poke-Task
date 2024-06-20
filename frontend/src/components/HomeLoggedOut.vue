<template>
  <div class="page-container">
    <div class="image-container">
      <img class="image" src="@/assets/pokemon-group.jpg" alt="Pokémon-Image" />
    </div>
    <div class="contents-container">
      <div class="messages-container">
        <div class="login-message">Please login to catch 'em all!</div>
        <div class="register-message">New trainer? Sign up to start!</div>
      </div>
      <div class="buttons-container">
        <button class="login-button">
          <img src="@/assets/pokeball.png" alt="Login" class="icon" />
          <span>Login</span>
        </button>
        <button class="register-button">
          <img src="@/assets/pokeball.png" alt="Register" class="icon" />
          <span>Sign me up!</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding-top: 10vh;
  gap: 10vw;
  font-family: "Press Start 2P", cursive;
}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.image {
  height: 600px;
  border: 2px solid rgba(0, 0, 0, 0.275);
  border-radius: 100px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.contents-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 10px 30px;
  gap: 2vh;
  height: 400px;
  border-radius: 30px;
}

.login-message,
.register-message {
  font-size: 1.5rem;
  margin: 10px 0;
  padding: 10px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  color: #333;
}

.login-message {
  border-left: 8px solid #4285f4;
}

.register-message {
  border-left: 8px solid #ea4335;
}

.buttons-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.login-button,
.register-button {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 10px 20px;
  margin: 10px;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s;
  font-family: "Press Start 2P", cursive;
}

.login-button {
  background: linear-gradient(145deg, #4285f4, #357ae8);
  color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.login-button:hover {
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
  transform: scale(1.1);
}

.register-button {
  background: linear-gradient(145deg, #ea4335, #c53829);
  color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.register-button:hover {
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
  transform: scale(1.1);
}

.icon {
  width: 25px;
  height: 25px;
  margin-right: 10px;
  transition: transform 0.3s;
}

.login-button:hover .icon,
.register-button:hover .icon {
  transform: rotate(-360deg);
}
</style>
