<template>
    <div>
      <h1>Регистрация</h1>
      <form @submit.prevent="handleRegister">
        <input v-model="name" type="text" placeholder="Имя пользователя" required />
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Пароль" required />
        <button type="submit">Зарегистрироваться</button>
        <p v-if="error">{{ error }}</p>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from '../axios'
  
  const name = ref('');
  const email = ref('');
  const password = ref('');
  const error = ref(null);
  const router = useRouter();
  
  async function handleRegister() {
    error.value = null;
    try {
      const response = await axios.post('/auth/register', {
        name: name.value,
        email: email.value,
        password: password.value,
        device_name: 'web'
      });
      
      // Предположим, что сервер возвращает токен или другую информацию
      console.log('Регистрация успешна:', response.data);
      
      // Перенаправление на страницу входа или другую страницу после успешной регистрации
      router.push('/login');
    } catch (e) {
      error.value = 'Ошибка при регистрации: ' + (e.response?.data?.message || e.message);
    }
  }
  </script>
  
  <style>
  /* Ваши стили */
  </style>