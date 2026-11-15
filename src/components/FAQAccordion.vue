<template>
  <div class="border-b border-white/10">
    <button @click="open = !open" class="w-full flex justify-between items-center py-4 text-left hover:text-spotify-green transition">
      <span class="font-medium">{{ question }}</span>
      <ChevronDown :class="['w-5 h-5 transition-transform shrink-0', open ? 'rotate-180' : '']" />
    </button>
    <Transition name="expand">
      <div v-if="open" class="pb-4 text-gray-400 text-sm">{{ answer }}</div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ChevronDown } from 'lucide-vue-next'
defineProps({ question: String, answer: String })
const open = ref(false)
</script>

<style scoped>
.expand-enter-active,.expand-leave-active{transition:all .3s;overflow:hidden}
.expand-enter-from,.expand-leave-to{max-height:0;opacity:0}
.expand-enter-to,.expand-leave-from{max-height:300px;opacity:1}
</style>