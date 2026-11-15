<template>
  <div class="max-w-xl mx-auto py-16 px-4">
    <h1 class="text-4xl font-bold mb-6">Contact Us</h1>
    <form @submit.prevent="sent = true" class="space-y-4">
      <input v-model="f.name" required placeholder="Name" class="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3" />
      <input v-model="f.email" type="email" required placeholder="Email" class="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3" />
      <input v-model="f.subject" required placeholder="Subject" class="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3" />
      <textarea v-model="f.message" required rows="5" placeholder="Message" class="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3"></textarea>
      <FlashButton type="submit" class="w-full">Send Message</FlashButton>
    </form>
    <p v-if="sent" class="mt-4 text-spotify-green">Message sent! We'll get back to you soon.</p>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import FlashButton from '@/components/FlashButton.vue'

const route = useRoute()
const sent = ref(false)
const f = reactive({ name: '', email: '', subject: route.query.subject || '', message: '' })
</script>
