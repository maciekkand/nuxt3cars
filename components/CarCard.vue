<script setup lang='ts'>
interface CardProps {
  id: string
  code: string
  brand: string
  status: string
  description?: string
}

const {
  id,
  code,
  brand,
  status,
  description = '',
} = defineProps<CardProps>()

const showModal = ref(false)

function carModal() {
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}
</script>

<template>
  <CarModal
    v-if="showModal"
    alt="car-big-photo-modal"
    :brand="brand"
    @close-modal="closeModal"
  />

  <div class="max-w-sm ml-8 overflow-hidden border shadow-lg border-slate-300 rounded-xl max-h-[400px]">
    <NuxtImg
      class="w-full h-[200px] cursor-pointer"
      :src="`/cars/${brand}.png`"
      alt="car-image"
      @click="carModal()"
    />

    <div class="px-6 py-3">
      <div class="mb-3 -mt-4 text-xl font-bold uppercase">
        {{ brand }}
      </div>

      <p class="text-base text-gray-700">
        {{ description }}
      </p>
    </div>

    <div class="px-6 pt-4 pb-2 lg:flex lg:justify-between">
      <span class="inline-block px-2 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-300 rounded-full">Id: {{ id }} </span>

      <span class="inline-block px-2 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-300 rounded-full">Code: {{ code }}</span>

      <span class="inline-block px-2 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-300 rounded-full">{{ status }}</span>
    </div>
  </div>
</template>
