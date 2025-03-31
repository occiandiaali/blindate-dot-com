<template>
    <div>
        <h1>Welcome to Blindate</h1>
        <main>
            <h3>Available to date now..</h3>
            <div class="user-list">
                <div v-for="user in users" :key="user.id" class="user-item">
                    <img :src="user.avatar" :alt="user.name" class="user-avatar" />
                    <span class="user-name">{{user.name}}</span>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';

const listDates = ref([]);
const users = ref([
    {id: 1, name: 'Emily', avatar: 'https://dummyjson.com/icon/emilys/128'},
    {id: 1, name: 'Michael', avatar: 'https://dummyjson.com/icon/michaelw/128'},
    {id: 1, name: 'Sophia', avatar: 'https://dummyjson.com/icon/sophiab/128'},
    {id: 1, name: 'James', avatar: 'https://dummyjson.com/icon/jamesd/128'},
    {id: 1, name: 'Emily', avatar: 'https://dummyjson.com/icon/emilys/128'},
])

async function getDates() {
    const res = await fetch("https://dummyjson.com/users?limit=4");
    const finalRes = await res.json();
    listDates.value = finalRes;
}

onMounted(() => {
  //  getDates();
})
</script>

<style scoped>
.user-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.user-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.user-name {
  font-size: 1.2em;
}

</style>
