<template>
    <div class="container">
      <h1>Создание объявления</h1>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="title">Заголовок</label>
          <input type="text" id="title" v-model="title" required />
          <div class="error">{{ titleError }}</div>
        </div>
  
        <div class="form-group">
          <label for="description">Описание</label>
          <textarea id="description" v-model="description" rows="5" required></textarea>
          <div class="error">{{ descriptionError }}</div>
        </div>
  
        <button type="submit">Создать объявление</button>
      </form>
    </div>
</template>
  
<script setup>
  import router from '@/router';
  import { ref } from 'vue';
  import axios from '../axios';
  
  const title = ref('');
  const description = ref('');
  const titleError = ref('');
  const descriptionError = ref('');
  
  const handleSubmit = () => {
    // Сброс ошибок
    titleError.value = '';
    descriptionError.value = '';
  
    let hasError = false;
  
    if (!title.value.trim()) {
      titleError.value = 'Пожалуйста, введите заголовок.';
      hasError = true;
    }
  
    if (!description.value.trim()) {
      descriptionError.value = 'Пожалуйста, введите описание.';
      hasError = true;
    }
  
    if (!hasError) {
      try {
        axios.post('/ads', {
          title: title.value.trim(),
          description: description.value.trim(),
        });

        console.log('Объявление создано:', { title: title.value, description: description.value });
        alert('Объявление успешно создано!');
        
        
        title.value = '';
        description.value = '';

        router.push('/ads')
      } catch (e) {
        alert('Ошибка при создании объявления: ' + (e.response?.data?.message || e.message));
      }
      
    }
  };
  </script>
  
  <style scoped>
  .container {
      max-width: 600px;
      margin: auto;
      background: white;
      padding: 20px;
      border-radius: 5px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
      text-align: center;
      color: #333;
  }
  
  .form-group {
      margin-bottom: 15px;
  }
  
  label {
      display: block;
      margin-bottom: 5px;
      color: #555;
  }
  
  input[type="text"],
  textarea {
      width: 100%;
      padding: 10px;
      border-radius: 4px;
      border: 1px solid #ccc;
  }
  
  textarea {
      resize: vertical; /* Позволяет изменять размер только по вертикали */
  }
  
  button {
      background-color: #28a745; /* Зеленый цвет */
      color: white;
      border: none;
      padding: 10px 15px;
      border-radius: 4px;
      cursor: pointer;
      width: 100%;
  }
  
  button:hover {
     background-color: #218838; /* Темнее при наведении */
  }
  
  .error {
     color: red; /* Красный цвет для ошибок */
     font-size: 0.9em; /* Уменьшенный размер шрифта */
  }
  </style>