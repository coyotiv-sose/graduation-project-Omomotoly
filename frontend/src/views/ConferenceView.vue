<script>
import axios from 'axios'
import CounterOptions from '../components/CounterOptions.vue'
import User from '../components/User.vue'

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
      `http://localhost:3000/conferences/${this.$route.params.id}`
    )
    this.conference = conference

    setInterval(() => {
      this.counter1Name = 'Conference Counter ' + Math.random()
    }, 1000)
  }
}
</script>

<template lang="pug">
CounterOptions(name="Conference Counter")
CounterOptions(name="Conference Counter 2")
div(v-if="!conference")
  p Loading...
div(v-else)
  h2 Conference {{conference.name}}

  h3 at {{conference.location}} on {{conference.date}}

  p {{conference.attendees.length}} people are attending:

  ul
    li(v-for="attendee in conference.attendees" :key="attendee._id") {{ attendee.name }}
</template>
