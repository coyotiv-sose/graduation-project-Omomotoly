

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

<!-- <template>
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
</template> -->

<template lang="pug">
.container
  h2 Sign up for an account
  form(@submit.prevent="doSignup")
    div#nameInput
      label.form-label(for="name") Name:
      input.form-control#name(v-model="name" type="text" required)

    div#emailInput
      label.form-label(for="email") Email:
      input.form-control#email(v-model="email" type="text" required)

    div.mb-3
      label.form-label(for="password") Password:
      input.form-control#password(v-model="password" type="password" required)
    div.loginButton.d-flex.justify-content-center
      button.btn.btn-primary(type="submit") Sign up

</template>
<style scoped>
#emailInput,
#nameInput {
  margin-bottom: 1rem;
}
.signupButton {
  margin: auto;
}
.container {
  max-width: 400px;
  margin-top: 2rem;
}
</style>
