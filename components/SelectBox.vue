<template>
  <div>
    <select
      class="border-1 rounded-lg mt-1 text-slate-600"
      :value="value"
      @input="handleSelection"
    >
      <option selected value="">{{ props.type }}</option>

      <option
        v-for="(item, index) in dataSet"
        :key="index"
      >{{ item }}</option>

    </select>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useCarsStore } from '../stores/carsStore'

const emit = defineEmits(['input'])
const carsStore = useCarsStore()

const props = defineProps({
  type: String,
  value: String
})

const dataSet = computed(() => {
  return props.type === "brand"
    ? carsStore.brandNames
    : carsStore.colors
})

function handleSelection(event) {
  emit('input', event.target.value)
}

onMounted(() => {
  carsStore.getBrandNames()
  carsStore.getColors()
})
</script>
