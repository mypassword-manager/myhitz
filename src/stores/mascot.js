import { defineStore } from 'pinia'

export const useMascotStore = defineStore('mascot', {
  state: () => ({ isBubbleOpen: false, isHidden: false }),
  actions: {
    toggleBubble() { this.isBubbleOpen = !this.isBubbleOpen },
    closeBubble() { this.isBubbleOpen = false },
    toggleHidden() { this.isHidden = !this.isHidden }
  },
  persist: true
})