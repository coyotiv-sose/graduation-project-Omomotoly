<template>
  <div>
    <h1>Sign Up</h1>
    <form @submit.prevent="signup">
      <label>
        Email:
        <input type="email" v-model="email" required />
      </label>
      <label>
        Password:
        <input type="password" v-model="password" required />
      </label>
      <button type="submit">Sign Up</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async signup() {
      try {
        const response = await axios.post('/accounts/signup', {
          email: this.email,
          password: this.password
        })
        console.log('User signed up:', response.data)
        // do something with the response, such as redirect to the login page
      } catch (error) {
        console.error('Error signing up:', error)
        // handle the error, such as displaying an error message to the user
      }
    }
  }
}
</script>
