<template>
  <div class="login-container">
    <h1>Вход</h1>
    <form @submit.prevent="handleLogin" class="login-form">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Пароль" required />
      <button type="submit">Войти</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const email = ref('');
const password = ref('');
const error = ref(null);

const router = useRouter();
const authStore = useAuthStore();

async function handleLogin() {
  error.value = null;
  try {
    await authStore.login({ email: email.value, password: password.value, device_name: 'web' });
    router.push('/ads');
  } catch (e) {
    error.value = 'Неверный логин или пароль';
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px; /* Максимальная ширина карточки */
  margin: auto; /* Центрирование карточки */
  background-color: white; /* Цвет фона карточки */
  border-radius: 8px; /* Закругленные углы */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Тень для эффекта поднятия */
  padding: 20px; /* Внутренние отступы */
}

h1 {
  text-align: center; /* Центрирование заголовка */
}

.login-form {
  display: flex;
  flex-direction: column; /* Вертикальное расположение полей */
}

input {
  margin-bottom: 15px; /* Отступ между полями */
  padding: 10px; /* Внутренние отступы в полях */
  border-radius: 4px; /* Закругленные углы полей */
  border: 1px solid #ccc; /* Граница полей */
}

input::placeholder {
  color: #aaa; /* Цвет текста в плейсхолдерах */
}

button {
  background-color: #007bff; /* Синий цвет кнопки */
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
   background-color: #0056b3; /* Темнее при наведении */
}

.error {
   color: red; /* Красный цвет для ошибок */
   font-size: 0.9em; /* Уменьшенный размер шрифта для ошибок */
   text-align: center; /* Центрирование текста ошибки */
}
</style>