import axios from 'axios'

// Создаем экземпляр Axios
const instance = axios.create({
  baseURL: 'http://localhost:8000/api', // Замените на ваш базовый URL
});

// Добавляем интерсептор для добавления токена в заголовки
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Получаем токен из localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Добавляем токен в заголовок
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;