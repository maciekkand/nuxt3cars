<script setup lang='ts'>
interface BrandProps {
  brand: string
}

const { brand } = defineProps<BrandProps>()

const emit = defineEmits<{
  (e: 'closeModal'): void
}>()

const carImageRef = ref()

function closeModal() {
  emit('closeModal')
}

onMounted(() => carImageRef.value?.focus())
</script>

<template>
  <div class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
    <div class="p-8 mt-12 ml-48 bg-white">
      <img
        ref="carImageRef"
        :src="`/cars/${brand}.png`"
        alt="car-image"
        class="w-[60rem] h-full"
        tabindex="0"
        @blur="closeModal"
      >
    </div>
  </div>
</template>
