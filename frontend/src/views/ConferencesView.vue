<script setup>
import axios from 'axios'
import ExampleVue from '../components/ExampleVue.vue'

import { RouterLink } from 'vue-router'

import Counter from '../components/Counter.vue'

import CounterOptions from '../components/CounterOptions.vue'

const { data: conferences } = await axios.get('http://localhost:3000/conferences')
console.log(conferences)
</script>

<template lang="pug">
h2 Conferences
p Welcome to the conferences page!
p Here are all the conferences that have been created by users.

  ul
      li(v-for="conference in conferences" :key="conference.id")
        User(:user="conference.attendees[0]")
        RouterLink(:to="`/conferences/${conference.id}`")
         | {{ conference.name}} at {{ conference.location }} on {{ conference.date }}
        p {{ conference.attendees?.length }} people are attending:
  <ExampleVue name="Conference Counter1" />
  <ExampleVue name="Conference Counter2" />


</template>
