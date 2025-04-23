<template>
    <div class="profile-container">
      <h1>Профиль пользователя</h1>
      <div class="user-info">
        <p><strong>Имя:</strong> {{ user.name ?? 'test' }}</p>
        <p><strong>Email:</strong> {{ user.email ?? 'test' }}</p>
      </div>
  
      <h2>Мои объявления</h2>
      <div class="ads-container">
        <div v-for="ad in ads" :key="ad.id" class="ad-card">
          <input v-model="ad.title" placeholder="Заголовок" />
          <textarea v-model="ad.description" placeholder="Описание"></textarea>
          <label>
            <input type="checkbox" v-model="ad.available" />
            Доступно
          </label>
          <button @click="updateAd(ad.id)">Обновить</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  //import { useAuthStore } from '../stores/auth';
  import axios from '../axios';
  
  const user = ref({});
  const ads = ref([]);
  
  //const authStore = useAuthStore();
  
  onMounted(async () => {
    // Получаем информацию о пользователе
    user.value = {name: 'test', email: 'test@example.com'}
  
    // Получаем объявления пользователя
    try {
      const response = await axios.get('/my');
      ads.value = response.data.data;
    } catch (error) {
      console.error('Ошибка при получении объявлений:', error);
    }
  });
  
  async function updateAd(adId) {
    const adToUpdate = ads.value.find(ad => ad.id === adId);
    
    try {
      await axios.put(`/ads/${adId}`, {
        title: adToUpdate.title,
        description: adToUpdate.description,
        available: adToUpdate.available,
      });
      alert('Объявление обновлено успешно!');
    } catch (error) {
      console.error('Ошибка при обновлении объявления:', error);
      alert('Ошибка при обновлении объявления.');
    }
  }
  </script>
  
  <style scoped>
  .profile-container {
    max-width: 600px; /* Максимальная ширина контейнера */
    margin: auto; /* Центрирование контейнера */
    padding: 20px; /* Внутренние отступы */
    background-color: white; /* Цвет фона */
    border-radius: 8px; /* Закругленные углы */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Тень для эффекта поднятия */
  }
  
  .user-info {
    margin-bottom: 20px; /* Отступ между информацией о пользователе и объявлениями */
  }
  
  .ads-container {
    display: flex;
    flex-direction: column; /* Вертикальное расположение карточек объявлений */
  }
  
  .ad-card {
    background-color: #f9f9f9; /* Цвет фона карточки объявления */
    border-radius: 4px; /* Закругленные углы карточки */
    padding: 15px; /* Внутренние отступы в карточке */
    margin-bottom: 15px; /* Отступ между карточками */
  }
  
  input[type="text"],
  textarea {
     width: calc(100% - 20px); /* Ширина полей ввода с учетом отступов */
     padding: 10px; /* Внутренние отступы в полях ввода */
     margin-bottom: 10px; /* Отступ между полями ввода и другими элементами */
     border-radius: 4px; /* Закругленные углы полей ввода */
     border: 1px solid #ccc; /* Граница полей ввода */
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
  </style>