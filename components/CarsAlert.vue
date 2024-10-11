<script setup lang='ts'>
import type { AlertProps } from '@/types/types'

const { type, message } = defineProps<AlertProps>()

const alertType = computed(() => {
  const fixedStyles = 'text-sm rounded-lg'
  return type === 'error' ? `${fixedStyles} text-red-800` : `${fixedStyles} text-blue-800`
})
</script>

<template>
  <div
    :class="alertType"
    role="alert"
    alt="alert-message"
  >
    <span class="text-base font-medium">{{ message }}</span>
  </div>
</template>
