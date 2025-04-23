<template>
  <div>
    <h1>Объявления</h1>
    <div v-if="loading">Загрузка...</div>
    <div v-if="error">{{ error }}</div>
    <div class="ads-container" v-if="ads.length">
      <div class="ad-card" v-for="ad in ads" :key="ad.id">
        <h2>{{ ad.title }}</h2>
        <p>{{ ad.description }}</p>
      </div>
    </div>
    <div v-else>Нет объявлений.</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from '../axios';

const ads = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const response = await axios.get('/ads');
    ads.value = response.data.data;
  } catch (e) {
    error.value = 'Ошибка при загрузке объявлений: ' + (e.response?.data?.message || e.message);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.ads-container {
  display: flex;
  flex-wrap: wrap; /* Позволяет карточкам переноситься на новую строку */
  gap: 20px; /* Промежуток между карточками */
}

.ad-card {
  background-color: white; /* Цвет фона карточки */
  border: 1px solid #ccc; /* Граница карточки */
  border-radius: 8px; /* Закругленные углы */
  padding: 15px; /* Внутренние отступы */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Тень для эффекта поднятия */
  width: calc(33.333% - 20px); /* Ширина карточки (3 в ряд с учетом промежутка) */
}

.ad-card h2 {
  margin: 0;
}

.ad-card p {
  margin-top: 10px; /* Отступ сверху для описания */
}

/* Адаптивность для меньших экранов */
@media (max-width: 768px) {
  .ad-card {
    width: calc(50% - 20px); /* Две карточки в ряд на средних экранах */
  }
}

@media (max-width: 480px) {
  .ad-card {
    width: calc(100% - 20px); /* Одна карточка на маленьких экранах */
  }
}
</style>