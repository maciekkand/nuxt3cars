<template>
  <div>
    <div
      :class="alertType"
      role="alert"
      alt="alert-message"
    >
      <span class="text-base font-medium">{{ message }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: String,
  message: String

})

const alertType = computed(() => {
  const fixedStyles = 'text-sm rounded-lg'
  return props.type === 'error' ? `${fixedStyles} text-red-800` : `${fixedStyles} text-blue-800`
})
</script>
