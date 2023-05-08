import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.baseURL = import.meta.env.VITE_API_URL

export const useUserStore = defineStore('User', {
  state: () => ({
    user: null
  }),
  actions: {
    async fetchUser() {
      this.user = (await axios.get('/signup')).data
    },
    async signup() {
      await axios.delete('/signup')
      this.user = null
      this.$router.push('/login')
    }
  }
})
