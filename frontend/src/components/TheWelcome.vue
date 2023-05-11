<script setup>
/* import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue' */
import axios from 'axios'

const { data: conferences } = await axios.get('http://localhost:3000/conferences')
</script>

<template>
  <h1>Conferences</h1>
  <ul>
    <li v-for="conference in conferences" :key="conference.id">
      {{ conference.name }} at {{ conference.location }} on {{ conference.date }}
    </li>
  </ul>
</template>
