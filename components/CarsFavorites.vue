<script setup lang='ts'>
import { useCarsStore } from '../stores/carsStore'

const carsStore = useCarsStore()
</script>

<template>
  <header>
    <h1 class="hidden text-3xl font-semibold 2xl:flex 2xl:justify-center 2xl:my-6">
      Selected Cars
    </h1>
  </header>

  <div class="grid grid-cols-4 gap-4">
    <div v-for="car in carsStore.favorites" :key="car.id">
      <CarCard
        :id="car.id!"
        :code="car.code"
        :brand="car.brand"
        :status="car.status"
        :description="car.description"
      />
    </div>
  </div>
</template>
