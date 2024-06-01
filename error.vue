<script setup lang='ts'>
defineProps({
  error: {
    type: Object as PropType<Error>,
    required: true,
  },
})

const handleClearError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="mt-8 ml-8 text-xl text-red-500">Ooops, something went wrong</div>
  <div class="mt-2 ml-8 text-xl text-green-500">statusCode = {{ error.statusCode }}</div>
  <div class="mt-2 ml-8 text-xl text-green-500">statusMessage = {{ error.message }}</div>

  <button
    @click="handleClearError"
    class="mt-8 ml-8 p-2 text-xl w-24 rounded-md border-slate-300 bg-blue-500 text-white"
  >Home</button>
</template>
