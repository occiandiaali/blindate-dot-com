<script lang="ts">
//import BabylonExamples from './BabylonExamples.vue';
import { defineComponent } from 'vue';
import { FirstPersonController } from '../BabylonExamples/FPController';

// export default {
//   name: 'App',
//   components: {
//     BabylonExamples
//   }
// }
export default defineComponent({
    name: 'App',
    mounted() {
        const canvas = document.querySelector("canvas") as HTMLCanvasElement;
        new FirstPersonController(canvas);
    }
 })
</script>

<template>
    <!-- <BabylonExamples /> -->
    <div id="canvas-wrapper">
    <canvas></canvas>
  </div>
</template>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

#canvas-wrapper {
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url("/images/Background_Dots.png");
  background-size: cover;
  background-position: center;
  position: relative;
}

canvas {
  width: 100vw;
  height: 100%;
  border: none;
  outline: none;
  box-shadow: 8px 8px 10px -6px #000000;
}

/* #app {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-image: url("/images/Background_Dots.png");
  background-size: cover;
  background-position: center;
  padding: 2rem;
} */
</style>
