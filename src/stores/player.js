import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('player', {
  state: () => ({
    currentSong: null, isPlaying: false, volume: 0.7, isMuted: false,
    progress: 0, duration: 0, shuffle: false, repeat: 'off', likedSongs: []
  }),
  getters: { isLiked: (s) => (id) => s.likedSongs.includes(id) },
  actions: {
    playSong(song) { this.currentSong = song; this.isPlaying = true; this.progress = 0 },
    togglePlay() { if (this.currentSong) this.isPlaying = !this.isPlaying },
    toggleLike(id) {
      const i = this.likedSongs.indexOf(id)
      i > -1 ? this.likedSongs.splice(i, 1) : this.likedSongs.push(id)
    },
    setVolume(v) { this.volume = Math.max(0, Math.min(1, v)); this.isMuted = false },
    toggleMute() { this.isMuted = !this.isMuted },
    setProgress(p) { this.progress = p },
    setDuration(d) { this.duration = d },
    toggleShuffle() { this.shuffle = !this.shuffle },
    cycleRepeat() {
      const m = ['off', 'all', 'one']
      this.repeat = m[(m.indexOf(this.repeat) + 1) % 3]
    }
  },
  persist: { paths: ['likedSongs', 'volume'] }
})