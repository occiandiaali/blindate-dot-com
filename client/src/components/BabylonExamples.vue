<template>
  <div id="canvas-wrapper">
    <canvas></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { FirstPersonController } from '../BabylonExamples/FPController';
 
 export default defineComponent({
    name: 'BabylonExamples',
    mounted() {
        const canvas = document.querySelector("canvas") as HTMLCanvasElement;
        new FirstPersonController(canvas);
    }
 })
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto+Condensed&family=Roboto:wght@100;700&display=swap");

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

#loader {
  width: 100%;
  height: 100%;
  background: slategrey;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#loaded {
  width: 100%;
  height: 100%;
  background: slategrey;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 1s ease;
}

#loadingContainer {
  width: 30%;
  height: 2rem;
  background: rgba(255, 255, 255, 0.75);
  border-radius: 6px;
  margin: 0.5rem;
}

#loadingBar {
  height: 100%;
  background: green;
  border-radius: 6px;
}

p {
  color: white;
  background: none;
  margin-bottom: 1rem;
  font-family: "Roboto Condensed";
  font-weight: 400;
  font-size: 2rem;
}

canvas {
  width: 100vw;
  height: 100%;
  border: none;
  outline: none;
  box-shadow: 8px 8px 10px -6px #000000;
}
</style>
