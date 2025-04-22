import { defineStore } from 'pinia'
import axios from '../axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async login(credentials) {
        const response = await axios.post('/auth/login', credentials)
        this.token = response.data.token
        this.user = response.data.user
        localStorage.setItem('token', this.token)

        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
    },
    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
    },
    async fetchUser() {
      if (!this.token) return

      try {
        const response = await axios.get('/api/user')
        this.user = response.data
      } catch (error) {
        this.logout()
      }
    }
  }
})