<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Search</h1>
    <input v-model="q" placeholder="What do you want to listen to?" class="w-full max-w-md bg-white/10 rounded-full px-4 py-3 mb-6 focus:outline-none focus:ring-2 ring-spotify-green" />
    <div v-if="results.length === 0" class="text-gray-400">No results for "{{ q }}"</div>
    <div v-else class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
      <button v-for="s in results" :key="s.id" @click="play(s)" class="bg-spotify-card p-3 rounded-lg hover:bg-white/10 text-left">
        <img :src="s.cover" class="w-full aspect-square rounded-md mb-3" alt="" />
        <p class="font-semibold text-sm truncate">{{ s.title }}</p>
        <p class="text-xs text-gray-400 truncate">{{ s.artist }}</p>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { songs } from '@/data/songs'
import { usePlayerStore } from '@/stores/player'

const route = useRoute()
const q = ref(route.query.q || '')
watch(() => route.query.q, v => q.value = v || '')
const results = computed(() => {
  if (!q.value.trim()) return songs
  const s = q.value.toLowerCase()
  return songs.filter(x => x.title.toLowerCase().includes(s) || x.artist.toLowerCase().includes(s))
})
const player = usePlayerStore()
const play = (s) => player.playSong(s)
</script>
