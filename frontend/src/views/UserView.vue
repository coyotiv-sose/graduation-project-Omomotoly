<script>
import axios from 'axios'
axios.defaults.baseURL = import.meta.env.VITE_API_URL
axios.defaults.withCredentials = true
export default {
name: 'UserView',
data () {
return {
user: null
}
},

async mounted () {
  const user = (await axios.get(`/users/${this.$route.params.id}`)).data
  this.user = user

}
}
</script>

<template>
  <h3>User details</h3>
  <div v-if="user">
    <p>Name: {{ user.name }}</p>
    <h5>Conferences</h5>
    <p  v-for="conference in user.conferences" :key="conference._id"> {{ conference.name }}</p>
  </div>
</template>
