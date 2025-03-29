<template>
    <div>
        <h1>Rooms View</h1>
        <!-- <div>
            <ul v-for="entry in rooms" :key="entry.name">
                <li><RouterLink :to="`/room/${entry.name}`">Room {{entry.name}} - {{entry.schedule}}</RouterLink></li>
            </ul>
        </div> -->
        <div>
            <ul v-for="entry in rooms" :key="entry.name">
                <li><RouterLink to="/room">Room {{entry.name}} - {{entry.schedule}}</RouterLink></li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import { RouterLink } from 'vue-router';

const rooms = ref([
    {name: '1', schedule: 'today'},
    {name: '2', schedule: 'today'},
    {name: '3', schedule: 'past'},
    {name: '4', schedule: 'today'},
    {name: '5', schedule: 'tomorrow'},
]);
</script>

<style>
li {
    list-style-type: none;
}
</style>