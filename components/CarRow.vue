<script setup lang='ts'>
import { useCarsStore } from '@/stores/carsStore'
import type { Car, RowProps } from '@/types/types'

const { item } = defineProps<RowProps>()

defineEmits<{
  (e: 'modifyCar', car: Car): void
  (e: 'deleteCar', carId: number): void
  (e: 'addFavorite', car: Car): void
}>()

const carsStore = useCarsStore()
</script>

<template>
  <li
    data-test="cars-table-id"
    class="py-3 pl-8"
    alt="cars-table-car-id"
  >
    {{ item.id }}
  </li>

  <li
    data-test="cars-table-code"
    class="py-3 -ml-5 text-left"
    alt="cars-table-car-code"
  >
    {{ item.code }}
  </li>

  <li
    data-test="cars-table-brand"
    class="py-3 -ml-4"
    alt="cars-table-car-brand"
  >
    {{ item.brand }}
  </li>

  <li
    data-test="cars-table-status"
    class="w-32 py-3 ml-4"
    alt="cars-table-car-status"
  >
    {{ item.status }}
  </li>

  <li
    data-test="cars-table-description"
    class="col-span-5 py-3 ml-16 text-left"
    alt="cars-table-car-description"
  >
    {{ item.description }}
  </li>

  <li class="col-span-1">
    <button
      data-test="cars-table-update"
      class="w-24 h-8 my-2 -ml-20 text-sm text-white bg-green-800 rounded-lg"
      alt="update-button"
      @click="$emit('modifyCar', item)"
    >
      Update
    </button>

    <button
      data-test="cars-table-delete"
      class="w-16 h-8 my-4 ml-6 text-sm text-white bg-red-800 rounded-lg"
      alt="delete-button"
      @click="$emit('deleteCar', item.id)"
    >
      Del
    </button>
  </li>

  <li class="col-span-1">
    <NuxtImg
      v-if="carsStore.getFavoriteIds.includes(item.id)"
      data-test="cars-table-favorite-on"
      src="../public/heart-on.svg"
      class="h-10 mt-3 ml-10 cursor-pointer"
      alt="heart-on"
      @click="$emit('addFavorite', item.id)"
    />

    <NuxtImg
      v-if="!carsStore.getFavoriteIds.includes(item.id)"
      data-test="cars-table-favorite-off"
      src="../public/heart-off.svg"
      class="h-10 mt-3 ml-10 cursor-pointer"
      alt="heart-off"
      @click="$emit('addFavorite', item.id)"
    />
  </li>
</template>
