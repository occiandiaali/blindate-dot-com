import { createApp } from 'vue'
import {createRouter, createWebHistory} from 'vue-router'
import HomeView from './views/HomeView.vue'

import './style.css'
import App from './App.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('./views/AboutView.vue')
    },
    {
        path: '/account',
        name: 'account',
        component: () => import('./views/AccountView.vue')
    },
    {
        path: '/rooms',
        name: 'rooms',
        component: () => import('./views/RoomsView.vue')
    },
    {
        path: '/room/:name',
        name: 'room',
        component: () => import('./components/RoomScene.vue')
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

createApp(App)
.use(router)
.mount('#app')
