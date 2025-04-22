<template>
    <form @submit.prevent="handleLogin">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Войти</button>
      <p v-if="error">{{ error }}</p>
    </form>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '../stores/auth'
  
  const email = ref('')
  const password = ref('')
  const error = ref(null)
  
  const router = useRouter()
  const authStore = useAuthStore()
  
  async function handleLogin() {
    error.value = null
    try {
      await authStore.login({ email: email.value, password: password.value, device_name: 'web'})
      router.push('/ads')
    } catch (e) {
      error.value = 'Неверный логин или пароль'
    }
  }
  </script>