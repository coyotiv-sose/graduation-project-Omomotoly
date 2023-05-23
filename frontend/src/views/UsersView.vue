<script setup>
import axios from 'axios'
import { RouterLink } from 'vue-router'
import User from '../components/User.vue'

const { data: users } = await axios.get('/users')
console.log(users)
</script>

<template lang="pug">
h2 Users

//list of users
ul
  li(v-for="user in users" :key="user._id")
    RouterLink(:to="`/users/${user._id}`")
      User(:user="user")
</template>
