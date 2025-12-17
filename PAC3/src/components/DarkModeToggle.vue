<!-- https://vueuse.org/core/useDark/ -->

<script setup lang="ts">
  import { useDark, useToggle } from '@vueuse/core'

  const isDark = useDark({
    // storageKey: 'vitepress-theme-appearance', // Custom storage key
    valueDark: 'dark-mode',
    valueLight: 'light-mode',
  })

  const toggleDark = useToggle(isDark)
</script>

<template>
  <button @click="toggleDark()">
    {{ isDark ? 'Dark' : 'Light' }}
  </button>
</template>
