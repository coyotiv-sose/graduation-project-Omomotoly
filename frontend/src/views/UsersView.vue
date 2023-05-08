<script setup>
import axios from 'axios'
import ExampleVue from '../components/ExampleVue.vue'
import { RouterLink } from 'vue-router'
import User from '../components/User.vue'

const { data: users } = await axios.get('http://localhost:3000/users')
console.log(users)
</script>

<template lang="pug">
h2 Users

//list of users
ul
  li(v-for="user in users" :key="user.id")
  User(:user="name")
  RouterLink(:to="`/users/${user.id}`")
  <User name="User" />
  <ExampleVue name="User Counter" />
</template>
