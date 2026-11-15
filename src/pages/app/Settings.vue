<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Settings</h1>
    <div class="bg-spotify-card p-6 rounded-xl max-w-2xl">
      <div class="flex items-center gap-4 mb-6">
        <img :src="auth.user?.avatar" class="w-20 h-20 rounded-full" alt="avatar" />
        <div>
          <input type="file" accept="image/*" @change="onAvatar" class="hidden" ref="el" />
          <FlashButton :flash="false" @click="el?.click()" class="text-sm !py-2 !px-4">Change Avatar</FlashButton>
        </div>
      </div>
      <div class="space-y-4">
        <div>
          <label class="block text-sm text-gray-400 mb-1">Username</label>
          <input v-model="username" class="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-2 focus:outline-none focus:border-spotify-green" />
        </div>
        <div>
          <label class="block text-sm text-gray-400 mb-1">Display Name</label>
          <input v-model="name" class="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-2 focus:outline-none focus:border-spotify-green" />
        </div>
        <div>
          <label class="block text-sm text-gray-400 mb-1">Email</label>
          <input v-model="email" type="email" class="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-2 focus:outline-none focus:border-spotify-green" />
        </div>
        <FlashButton @click="save">Save Changes</FlashButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import FlashButton from '@/components/FlashButton.vue'

const auth = useAuthStore()
const username = ref(auth.user?.username || '')
const name = ref(auth.user?.name || '')
const email = ref(auth.user?.email || '')
const el = ref(null)

function onAvatar(e) {
  const file = e.target.files[0]
  if (!file) return
  if (file.size > 2 * 1024 * 1024) { alert('Max 2MB'); return }
  const r = new FileReader()
  r.onload = () => auth.updateProfile({ avatar: r.result })
  r.readAsDataURL(file)
}
function save() {
  auth.updateProfile({ username: username.value, name: name.value, email: email.value })
  alert('Saved!')
}
</script>
