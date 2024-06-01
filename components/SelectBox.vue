<script setup>
import { useCarsStore } from '../stores/carsStore'

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  update: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['input'])
const carsStore = useCarsStore()

const dataSet = computed(() => {
  let availableStatuses = []
  const currentStatusIndex = carsStore.statuses.indexOf(props.value)
  const statusesCount = carsStore.statuses.length
  const zeroStatus = carsStore.statuses[0]
  const firstStatus = carsStore.statuses[1]
  const lastStatus = carsStore.statuses[statusesCount - 1]

  if (!props.value || props.value === zeroStatus)
    availableStatuses = carsStore.statuses
  else if (props.value === lastStatus)
    availableStatuses = [props.value, firstStatus, zeroStatus]
  else
    availableStatuses = [props.value, carsStore.statuses[currentStatusIndex + 1], zeroStatus]

  return props.type === 'Brand'
    ? carsStore.brands
    : availableStatuses
})

function handleSelection(event) {
  emit('input', event.target.value)
}
</script>

<template>
  <select
    class="border-1 rounded-lg mt-1 text-slate-600 w-44"
    :value="props.value"
    @input="handleSelection"
  >
    <option v-if="!update" value="" disabled selected>
      {{ props.type }}
    </option>

    <option
      v-for="item in dataSet"
      :key="item"
    >
      {{ item }}
    </option>
  </select>
</template>
