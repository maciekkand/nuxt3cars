<script setup lang='ts'>
interface AlertProps {
  type: string
  message: string
}

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
