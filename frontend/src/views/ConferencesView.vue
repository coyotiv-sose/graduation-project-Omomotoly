<script>
import axios from 'axios'
import { RouterLink } from 'vue-router'
axios.defaults.withCredentials = true
axios.defaults.baseURL = import.meta.env.VITE_API_URL

export default {
  name: 'ConferencesView',
  data() {
    return {
      conferences: []
    }
  },
  async created () {
    const { data: conferences } = await axios.get('/conferences')
    this.conferences = conferences
  }
}

</script>

<template lang="pug">
h2 Conferences
p Welcome to the conferences page!
p Here are all the conferences that have been created by users.

  ul
    li(v-for="conference in conferences" :key="conference._id")
      User(:user="conference.attendees[0]")
      RouterLink(:to="`/conferences/${conference._id}`")
        | {{ conference.name}} at {{ conference.location }} on {{ conference.date }}
      p {{ conference.attendees?.length }} people are attending:



</template>
