import { defineStore } from 'pinia'
import { io } from 'socket.io-client'

const socket = io('')

export const useSocketStore = defineStore('Socket', {
  state: () => ({
    connected: false
  }),
  actions: {
    init() {
      socket.on('connect', () => {
        this.connected = true
        console.log('connected')
      })
      socket.on('disconnect', () => {
        this.connected = false
        console.log('disconnected')
      })
    }
  }
})
