<template>
  <div>
    <div class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
      <div class="p-8 mt-12 ml-48 bg-white">
        <img
          :src="require(`../assets/cars/${brand}.png`)"
          alt="car-image"
          class="w-[60rem] h-full"
          ref="carImage"
          @blur="closeModal"
          tabindex="0"
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps({
  message: String,
  brand: String
})

const emit = defineEmits(['closeModal'])
const carImage = ref(null)

function closeModal() {
  emit('closeModal')
}

onMounted(() => {
  carImage.value.focus();
})
</script>
