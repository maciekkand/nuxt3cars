<template>
  <div alt="pagination">
    <label class="mt-2 mr-4">Select number of rows per page </label>
    <select
      v-model="rowsNumber"
      @change="changePagination"
      class="text-black rounded w-18 form-select"
      alt="select-rows-per-page"
    >
      <option>10</option>
      <option>20</option>
      <option>50</option>
      <option>100</option>
    </select>

    <button
      href="#"
      @click="prevPage"
      class="mt-2 ml-8 font-semibold text-blue-600 underline"
      alt="previous-page-button"
    >Prev</button>

    <button
      href="#"
      @click="nextPage"
      class="mt-2 ml-12 font-semibold text-blue-600 underline"
      alt="next-page-button"
    >Next</button>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const emit = defineEmits(['newPagination'])

const rowsNumber = ref(10)
const pageStart = ref(0)

const rowStart = computed(() => {
  return pageStart.value * rowsNumber.value
})

function returnPagination() {
  emit('newPagination', { start: rowStart.value, limit: rowsNumber.value })
}

function nextPage() {
  ++pageStart.value
  returnPagination()
}

function prevPage() {
  pageStart.value && --pageStart.value
  returnPagination()
}

function changePagination() {
  pageStart.value = 0
  returnPagination()
}
</script>
