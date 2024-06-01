<script setup>
defineProps({
  brand: String,
})

const emit = defineEmits(['closeModal'])
const carImage = ref(null)

function closeModal() {
  emit('closeModal')
}

onMounted(() => {
  carImage.value.focus()
})
</script>

<template>
  <div class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
    <div class="p-8 mt-12 ml-48 bg-white">
      <img
        ref="carImage"
        :src="`/cars/${brand}.png`"
        alt="car-image"
        class="w-[60rem] h-full"
        tabindex="0"
        @blur="closeModal"
      >
    </div>
  </div>
</template>
