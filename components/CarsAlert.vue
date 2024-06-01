<script setup>
const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
})

const alertType = computed(() => {
  const fixedStyles = 'text-sm rounded-lg'
  return props.type === 'error' ? `${fixedStyles} text-red-800` : `${fixedStyles} text-blue-800`
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
