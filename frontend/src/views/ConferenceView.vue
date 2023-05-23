<script>
import axios from 'axios'
import CounterOptions from '../components/CounterOptions.vue'
import User from '../components/User.vue'

axios.defaults.withCredentials = true
axios.defaults.baseURL = import.meta.env.VITE_API_URL

export default {
  name: 'ConferenceDetail',
  components: {
    CounterOptions,
    User
  },
  data() {
    return {
      conference: null,
      counter1Name: 'Conference Counter',
      counter2Name: 'Conference Counter 2'
    }
  },
  async created() {
    const { data: conference } = await axios.get(
      `/conferences/${this.$route.params.id}`
    )
    this.conference = conference

    setInterval(() => {
      this.counter1Name = 'Conference Counter ' + Math.random()
    }, 1000)
  },
  methods: {
    async joinConference() {
      const { data: conference } = await axios.post(
        `/conferences/${this.$route.params.id}/attendees`
      )
      this.conference = conference
    }
  }
}
</script>

<template lang="pug">
//CounterOptions(name="Conference Counter")
//CounterOptions(name="Conference Counter 2")
div(v-if="!conference")
  p Loading...
div(v-else)
  h3 Conference: {{conference.name}}

  h3 at {{conference.location}} on {{conference.date}}

  p {{conference.attendees.length}} people are attending:

  ul
    li(v-for="attendee in conference.attendees" :key="attendee._id") {{ attendee.name }}
  button.btn.btn-outline-primary(v-on:click="joinConference") Join Conference

</template>
