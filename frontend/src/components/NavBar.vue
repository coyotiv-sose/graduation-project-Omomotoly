<script>
import { useAccountStore } from '../stores/account'
import { mapActions } from 'pinia'
export default {
  name: 'NavBar',
  props: {
    user: Object
  },
  methods: {
    ...mapActions(useAccountStore, ['logout'])
  }

}
</script>
<template lang="pug">
nav.navbar.navbar-expand-lg.bg-body-tertiary
  .container-fluid
    a.navbar-brand(href='/') The Platform
    button.navbar-toggler(type='button' data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation')
      span.navbar-toggler-icon
    #navbarSupportedContent.collapse.navbar-collapse
      ul.navbar-nav.me-auto.mb-2.mb-lg-0
        li.nav-item
          router-link.nav-link.active(to="/") Home
        li.nav-item
          router-link.nav-link(to="/conferences") Conferences
        li.nav-item
          router-link.nav-link(to="/users") Users
        li.nav-item(v-if="!user")
          router-link.nav-link(to="/login") Log in
        li.nav-item(v-if="!user")
          router-link.nav-link(to="/signup") Sign up
        li.nav-item(v-if="user")
          a.nav-link(@click="logout") Log out
</template>
