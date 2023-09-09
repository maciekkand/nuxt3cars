<template>
  <div>
    <NuxtLink
      to="/"
      exact
      class="flex justify-center my-2 font-semibold text-blue-500 underline"
    >Return</NuxtLink>

    <header>
      <h1 class="hidden text-3xl font-semibold 2xl:flex 2xl:justify-center 2xl:my-6">Selected Cars</h1>
    </header>

    <div class="grid grid-cols-4 gap-4">
      <div v-for="(car, ix) in carsStore.favorites" :key="ix">
        <Card
          :id="car.id"
          :brand="car.brand"
          :year="Number(car.year)"
          :price="Number(car.price)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCarsStore } from '../stores/carsStore'
import Card from '../components/Card.vue'

const carsStore = useCarsStore()
</script>
