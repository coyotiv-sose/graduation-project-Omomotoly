<script setup>
import axios from 'axios'

//axios.defaults.withCredentials = true

//axios.defaults.baseURL = import.meta.env.VITE_API_URL

const { data: conferences } = await axios.get('/conferences')
</script>

<!-- <template>
  <h1>Conferences</h1>
  <ul>
    <li v-for="conference in conferences" :key="conference.id">
      {{ conference.name }} at {{ conference.location }} on {{ conference.date }}
    </li>
  </ul>
</template> -->

<template>
  <h1>Conferences</h1>
  <ul>
    <li v-for="conference in conferences" :key="conference.id">
      {{ conference.name }} at {{ conference.location }} on {{ conference.date }}
    </li>
  </ul>
</template>
