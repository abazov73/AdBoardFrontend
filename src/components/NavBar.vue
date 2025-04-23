<template>
    <nav>
        <router-link v-if="!authStore.isAuthenticated" to="/login">Вход</router-link>
        <router-link v-if="!authStore.isAuthenticated" to="/register">Регистрация</router-link>
        <router-link v-if="authStore.isAuthenticated" to="/ads">Доска объявлений</router-link>
        <router-link v-if="authStore.isAuthenticated" to="/ads/create">Создать объявление</router-link>
        <button v-if="authStore.isAuthenticated" @click="logout">Выйти</button>
    </nav>
</template>
    
<script setup>
    import { useAuthStore } from '../stores/auth'
    import router from '../router';
    const authStore = useAuthStore()
        function logout() {
        authStore.logout();
        router.push('/login')
    }
</script>
    
<style scoped>
    
    nav {
        background-color: #333;
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    nav a {
        color: white;
        text-decoration: none;
        padding: 10px 15px;
        transition: background-color 0.3s ease;
    }
    
    nav a:hover {
        background-color: #575757;
    }
    
    nav button {
        background-color: #e74c3c;
        color: white;
        border: none;
        padding: 10px 15px;
        cursor: pointer;
    }
    
    nav button:hover {
        background-color: #c0392b;
    }
    
    @media (max-width: 768px) {
        nav {
            flex-direction: column;
            align-items: flex-start;
            padding: 10px;
        }
    
        nav a, nav button {
            width: 100%;
            text-align:left;
            margin-bottom :5px ;
       }
    }
    </style>