<template>
  <div>
    <h1>Объявления</h1>
    <div v-if="loading">Загрузка...</div>
    <div v-if="error">{{ error }}</div>
    <ul v-if="ads.length">
      <li v-for="ad in ads" :key="ad.id">
        <h2>{{ ad.title }}</h2>
        <p>{{ ad.description }}</p>
      </li>
    </ul>
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
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin-bottom: 20px;
}
h2 {
  margin: 0;
}
</style>