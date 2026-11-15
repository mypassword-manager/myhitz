<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Dashboard</h1>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div v-for="s in stats" :key="s.label" class="bg-spotify-card p-6 rounded-xl">
        <p class="text-sm text-gray-400 mb-1">{{ s.label }}</p>
        <p class="text-2xl md:text-3xl font-bold text-spotify-green">{{ s.value }}</p>
      </div>
    </div>
    <div class="bg-spotify-card p-6 rounded-xl">
      <h2 class="text-xl font-bold mb-4">Recently Played</h2>
      <p class="text-gray-400 text-sm">Play some songs to see your history here.</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { usePlayerStore } from '@/stores/player'
const player = usePlayerStore()
const stats = computed(() => [
  { label: 'Liked Songs', value: player.likedSongs.length },
  { label: 'R-Cash Balance', value: '0' },
  { label: 'Listening Streak', value: '0 days' },
  { label: 'Playlists', value: '0' }
])
</script>
