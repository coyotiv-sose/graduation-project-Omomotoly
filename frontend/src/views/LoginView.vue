<script>
import { useAccountStore } from '../stores/account'
import { mapActions } from 'pinia'

export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(useAccountStore, ['login']),
    async doLogin() {
      await this.login(this.email, this.password)
      this.$router.push('/')
    }
  }
}
</script>

<!-- <template lang="pug">
h1 Login

form(@submit.prevent="doLogin")
  div
    label(for="email") Email
    input#email(type="email" v-model="email" required)
  div
    label(for="password") Password
    input#password(type="password" v-model="password" required)
  button(type="submit") Log in

</template> -->

<template lang="pug">
.container
  h2 Login to your account
  form(@submit.prevent="doLogin")
    div#emailInput
      label.form-label(for="email") Email:
      input.form-control#email(v-model="email" type="text" required)

    div.mb-3
      label.form-label(for="password") Password:
      input.form-control#password(v-model="password" type="password" required)
    div.loginButton.d-flex.justify-content-center
      button.btn.btn-primary(type="submit") Log in

</template>
<style scoped>
#emailInput {
  margin-bottom: 1rem;
}
.loginButton {
  margin: auto;
}
.container {
  max-width: 400px;
  margin-top: 2rem;
}
</style>
