<script setup>
import axios from 'axios'

import Counter from '../components/Counter.vue'

const { data: conferences } = await axios.get('http://localhost:3000/conferences')
</script>

<template>
  <div class="conferences">
    <h1>Conferences</h1>
    <Counter />
    <ul>
      <li v-for="conference in conferences" :key="conference.id">
        {{ conference.name }} at {{ conference.location }} on {{ conference.date }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
h1 {
  color: red;
}
</style>
