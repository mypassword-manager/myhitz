<template>
  <div v-if="!mascot.isHidden" class="fixed bottom-24 right-6 z-50">
    <Transition name="bubble">
      <div v-if="mascot.isBubbleOpen" class="absolute bottom-full right-0 mb-3 w-64 bg-white text-black rounded-2xl p-4 shadow-2xl">
        <div v-if="!responded">
          <p class="font-semibold mb-3 text-sm">{{ t('mascot.question') }}</p>
          <div class="flex gap-2">
            <button @click="yes" class="flex-1 bg-spotify-green text-black text-xs font-semibold rounded-full py-2 hover:bg-spotify-green-hover">{{ t('mascot.yes') }}</button>
            <button @click="no" class="flex-1 bg-gray-200 text-black text-xs font-semibold rounded-full py-2 hover:bg-gray-300">{{ t('mascot.no') }}</button>
          </div>
        </div>
        <p v-else class="font-semibold text-center text-sm">{{ t('mascot.thanks') }}</p>
        <div class="absolute -bottom-1.5 right-8 w-3 h-3 bg-white rotate-45"></div>
      </div>
    </Transition>
    <button @click="onClick" class="w-16 h-16 animate-bounce-slow hover:scale-110 transition-transform" aria-label="Hitz mascot">
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="50" cy="72" rx="30" ry="22" fill="#1DB954"/>
        <circle cx="50" cy="42" r="26" fill="#1ED760"/>
        <rect x="22" y="30" width="9" height="20" rx="4" fill="#121212"/>
        <rect x="69" y="30" width="9" height="20" rx="4" fill="#121212"/>
        <path d="M 26 32 Q 50 14 74 32" stroke="#121212" stroke-width="4" fill="none"/>
        <ellipse cx="42" cy="42" rx="4" ry="5" fill="#121212"/>
        <ellipse cx="58" cy="42" rx="4" ry="5" fill="#121212"/>
        <circle cx="43" cy="40" r="1.5" fill="white"/>
        <circle cx="59" cy="40" r="1.5" fill="white"/>
        <path d="M 44 54 Q 50 59 56 54" stroke="#121212" stroke-width="2" fill="none" stroke-linecap="round"/>
        <ellipse cx="72" cy="88" rx="4" ry="3" fill="#121212"/>
        <line x1="76" y1="88" x2="76" y2="76" stroke="#121212" stroke-width="2"/>
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useMascotStore } from '@/stores/mascot'

const mascot = useMascotStore()
const router = useRouter()
const { t } = useI18n()
const responded = ref(false)

function onClick() { mascot.isBubbleOpen = true; responded.value = false }
function yes() {
  responded.value = true
  setTimeout(() => { router.push({ path: '/contact', query: { subject: 'Help from mascot' } }); mascot.closeBubble(); responded.value = false }, 800)
}
function no() {
  responded.value = true
  setTimeout(() => { mascot.closeBubble(); responded.value = false }, 1200)
}
</script>

<style scoped>
.bubble-enter-active,.bubble-leave-active{transition:all .3s}
.bubble-enter-from,.bubble-leave-to{opacity:0;transform:translateY(10px)}
</style>