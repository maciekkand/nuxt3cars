<script setup lang='ts'>
import { useCarsStore } from '~/stores/carsStore'

const emit = defineEmits(['newPagination'])
const carsStore = useCarsStore()

const rowsNumber = ref(10)
const pageStart = ref(0)
const rowStart = ref(0)

function doPagination() {
  rowStart.value = pageStart.value * rowsNumber.value

  if (rowStart.value < 0)
    rowStart.value = rowStart.value + carsStore.carsCount

  emit('newPagination', { start: rowStart.value, limit: rowsNumber.value })
}

function nextPage() {
  pageStart.value = pageStart.value + 1
  doPagination()
}

function prevPage() {
  pageStart.value = pageStart.value - 1
  doPagination()
}

function changePagination() {
  pageStart.value = 0
  doPagination()
}
</script>

<template>
  <div alt="pagination">
    <label class="mt-2 mr-4">Select number of rows per page </label>
    <select
      v-model="rowsNumber"
      class="text-black rounded w-18 form-select"
      alt="select-rows-per-page"
      @change="changePagination"
    >
      <option>10</option>
      <option>20</option>
      <option>50</option>
      <option>100</option>
    </select>

    <button
      href="#"
      class="mt-2 ml-8 font-semibold text-blue-600 underline"
      alt="previous-page-button"
      @click="prevPage"
    >
      Prev
    </button>

    <button
      href="#"
      class="mt-2 ml-12 font-semibold text-blue-600 underline"
      alt="next-page-button"
      @click="nextPage"
    >
      Next
    </button>
  </div>
</template>
