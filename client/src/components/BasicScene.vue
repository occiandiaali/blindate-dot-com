<script setup>
import { onMounted } from 'vue';
import {
    CreateCapsule,
    Engine,
    HemisphericLight,
    Scene,
    UniversalCamera,
    Vector3
} from '@babylonjs/core';

function initScene() {
    const canvas = this.$refs.renderCanvas;
    const engine = Engine(canvas, true);
    const scene = Scene(engine);

    const camera = UniversalCamera("camera", Math.PI / 2, Math.PI / 2, 2, Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    const light = HemisphericLight("light", Vector3(1,1,0),scene);

    const player = CreateCapsule("player", {}, scene);

    engine.runRenderLoop(() => {
        scene.render();
    });
    window.addEventListener('resize', () => {
        engine.resize();
    })
}

onMounted(() => {
    initScene();
})
</script>

<template>
    <main ref="renderCanvas" class="mainDiv"></main>
</template>

<style scoped>
.mainDiv {
    width: 100%;
    height: 100vh;
}
</style>
