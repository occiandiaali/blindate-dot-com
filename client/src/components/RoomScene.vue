<script lang="ts">
//import BabylonExamples from './BabylonExamples.vue';
import { defineComponent, ref } from 'vue';
import { FirstPersonController } from '../BabylonExamples/FPController';
import {io} from 'socket.io-client';

const socket = io("http://localhost:3000");
let micShow = ref<Boolean>(false);

let localStream: MediaStream;
let peerConnection: RTCPeerConnection;
const config = {
  iceServers: [
    {urls: 'stun:stun.1.google.com:19302'}
  ]
};

async function startVoiceChat() {
  localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        peerConnection = new RTCPeerConnection(config);

        localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

        peerConnection.onicecandidate = event => {
            if (event.candidate) {
                socket.emit('ice-candidate', event.candidate);
            }
        };
        peerConnection.ontrack = event => {
            const remoteAudio = document.createElement('audio');
            remoteAudio.srcObject = event.streams[0];
            remoteAudio.autoplay = true;
            document.body.appendChild(remoteAudio);
        };

        socket.on('offer', async (offer) => {
            await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
            const answer = await peerConnection.createAnswer();
            await peerConnection.setLocalDescription(answer);
            socket.emit('answer', answer);
        });
        socket.on('answer', async (answer) => {
            await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
        });

        socket.on('ice-candidate', async (candidate) => {
            try {
                await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
            } catch (e) {
                console.error('Error adding received ice candidate', e);
            }
        });
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        socket.emit('offer', offer);
        if (offer) {
          micShow.value = true;
        }
}

// export default {
//   name: 'App',
//   components: {
//     BabylonExamples
//   }
// }
export default defineComponent({
    name: 'App',
    data() {
      return{
        micShow: false,
        micImg: '/images/speaker.png'
      }
    },
    mounted() {
        const canvas = document.querySelector("canvas") as HTMLCanvasElement;
        new FirstPersonController(canvas);
        startVoiceChat();
    }
 })
// onMounted(() => {
//   const canvas = document.querySelector("canvas") as HTMLCanvasElement;
//   new FirstPersonController(canvas);
// })
</script>

<template>
    <!-- <BabylonExamples /> -->
    <div id="canvas-wrapper">
      <canvas></canvas>
      <img v-if="micShow" :src="micImg" alt="mic" class="micImage" />
  </div>
</template>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

#canvas-wrapper {
  width: 90vw;
  height: 100vh;
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
  /* width: 100vw;
  height: 100%; */
  width: 90%;
  height: 80%;
  border: none;
  outline: none;
  box-shadow: 8px 8px 10px -6px #000000;
}

.micImage {
  position: absolute;
  top: 10px;
  left: 20px;
  width: 100px;
  height: 100px;
  opacity: 0.7;
  color: white;
  z-index: 99;
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
