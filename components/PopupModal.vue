<template>
  <div>
    <div class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
      <div class="p-8 ml-48 -mt-64 bg-white">

        <div class="flex justify-center">
          <h3 class="text-2xl">{{ message }}</h3>
        </div>

        <div class="mt-8">
          <button
            @click="shouldDelete(true)"
            class="px-12 py-2 mr-12 text-white bg-blue-600 rounded"
          >Yes</button>

          <button
            @click="shouldDelete(false)"
            class="px-12 py-2 text-white bg-red-800 rounded"
          >No</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['shouldDelete'])

const props = defineProps({
  message: String
})

function shouldDelete(isDelete) {
  emit('shouldDelete', isDelete)
}
</script>
