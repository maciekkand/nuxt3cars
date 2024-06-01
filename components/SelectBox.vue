<script setup lang='ts'>
import { useCarsStore } from '../stores/carsStore'

interface SelectProps {
  type: string
  value: string
  update?: boolean
}

const { type, value, update } = defineProps<SelectProps>()

const emit = defineEmits<{
  (e: 'input', value: string): void
}>()

const carsStore = useCarsStore()

const dataSet = computed(() => {
  let availableStatuses = []
  const currentStatusIndex = carsStore.statuses.indexOf(value)
  const statusesCount = carsStore.statuses.length
  const zeroStatus = carsStore.statuses[0]
  const firstStatus = carsStore.statuses[1]
  const lastStatus = carsStore.statuses[statusesCount - 1]

  if (!value || value === zeroStatus)
    availableStatuses = carsStore.statuses
  else if (value === lastStatus)
    availableStatuses = [value, firstStatus, zeroStatus]
  else
    availableStatuses = [value, carsStore.statuses[currentStatusIndex + 1], zeroStatus]

  return type === 'Brand'
    ? carsStore.brands
    : availableStatuses
})

function handleSelection(event: Event) {
  const element = event.target as HTMLButtonElement
  emit('input', element.value)
}
</script>

<template>
  <select
    class="border-1 rounded-lg mt-1 text-slate-600 w-44"
    :value="value"
    @input="handleSelection"
  >
    <option v-if="!update" value="" disabled selected>
      {{ type }}
    </option>

    <option
      v-for="item in dataSet"
      :key="item"
    >
      {{ item }}
    </option>
  </select>
</template>
