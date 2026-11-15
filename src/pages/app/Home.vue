<template>
  <div class="space-y-10">
    <section>
      <h1 class="text-3xl font-bold mb-4">Good evening</h1>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
        <button v-for="s in songs.slice(0,6)" :key="s.id" @click="play(s)" class="flex items-center gap-3 bg-white/5 hover:bg-white/10 rounded-lg overflow-hidden transition text-left">
          <img :src="s.cover" class="w-16 h-16" alt="" />
          <span class="font-semibold text-sm truncate">{{ s.title }}</span>
        </button>
      </div>
    </section>
    <section>
      <h2 class="text-2xl font-bold mb-4">Trending Now</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <button v-for="s in songs" :key="s.id" @click="play(s)" class="bg-spotify-card p-3 rounded-lg hover:bg-white/10 transition text-left group">
          <div class="relative mb-3">
            <img :src="s.cover" class="w-full aspect-square rounded-md" alt="" />
            <div class="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-spotify-green text-black items-center justify-center opacity-0 group-hover:opacity-100 transition hidden md:flex">
              <Play class="w-5 h-5" fill="currentColor" />
            </div>
          </div>
          <p class="font-semibold text-sm truncate">{{ s.title }}</p>
          <p class="text-xs text-gray-400 truncate">{{ s.artist }}</p>
        </button>
      </div>
    </section>
    <section>
      <h2 class="text-2xl font-bold mb-4">Popular Artists</h2>
      <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div v-for="a in artists" :key="a.id" class="text-center">
          <img :src="a.image" class="w-full aspect-square rounded-full mb-2 object-cover" alt="" />
          <p class="font-semibold text-sm">{{ a.name }}</p>
          <p class="text-xs text-gray-400">{{ a.followers }} followers</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { Play } from 'lucide-vue-next'
import { songs, artists } from '@/data/songs'
import { usePlayerStore } from '@/stores/player'
const player = usePlayerStore()
const play = (s) => player.playSong(s)
</script>
