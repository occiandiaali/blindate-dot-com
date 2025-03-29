<!-- <script>
import HelloWorld from './components/HelloWorld.vue'
import BasicScene from './components/BasicScene.vue'

import BabylonExamples from './components/BabylonExamples.vue';

export default {
  name: 'App',
  components: {
    BabylonExamples
  }
}
</script>

<template>
  <div id="app">
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
    <BabylonExamples /> 
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

#app {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-image: url("../public/images/Background_Dots.png");
  background-size: cover;
  background-position: center;
  padding: 2rem;
}
</style> -->

<script setup>
//import {RouterLink, RouterView} from 'vue-router';
</script>

<template>
  <header>
    <div class="nav-wrapper">
      <nav>
        <RouterLink to="/">Blindate</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/rooms">Rooms</RouterLink>
        <RouterLink to="/account">Account</RouterLink>
      </nav>
    </div>
  </header>
  <main id="main">
  <RouterView />
</main>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto+Condensed&family=Roboto:wght@100;700&display=swap");
#main {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  /* background-image: url("/images/Background_Dots.png");
  background-size: cover;
  background-position: center; */
  padding: 2rem;
}
nav {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.nav-wrapper {
  width: 100%;
}
</style>
