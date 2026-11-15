<template>
  <button :type="type" @click="$emit('click', $event)"
    :class="['relative overflow-hidden rounded-full font-semibold transition-all duration-200 px-6 py-3 group',
      variant === 'primary' ? 'bg-spotify-green text-black hover:bg-spotify-green-hover hover:scale-105'
      : variant === 'outline' ? 'border border-white/30 text-white hover:bg-white/10'
      : 'bg-white text-black hover:bg-gray-200']">
    <span v-if="flash" class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></span>
    <span class="relative z-10"><slot /></span>
  </button>
</template>

<script setup>
defineProps({ variant: { type: String, default: 'primary' }, type: { type: String, default: 'button' }, flash: { type: Boolean, default: true } })
defineEmits(['click'])
</script>