<script setup lang='ts'>
interface PopupProps {
  message: string
}

const { message } = defineProps<PopupProps>()

const emit = defineEmits<{
  (e: 'shouldDelete'): void
}>()

function shouldDelete(isDelete: boolean) {
  emit('shouldDelete', isDelete)
}
</script>

<template>
  <div class="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 h-full">
    <div class="p-8 ml-48 bg-white">
      <div class="flex justify-center">
        <h3 class="text-2xl">
          {{ message }}
        </h3>
      </div>

      <div class="mt-8">
        <button
          class="px-12 py-2 mr-12 text-white bg-blue-600 rounded"
          @click="shouldDelete(true)"
        >
          Yes
        </button>

        <button
          class="px-12 py-2 text-white bg-red-800 rounded"
          @click="shouldDelete(false)"
        >
          No
        </button>
      </div>
    </div>
  </div>
</template>
