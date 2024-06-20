<script setup lang='ts'>
import { useCarsStore } from '../stores/carsStore'

const props = defineProps({
  inputPlaceholder: {
    type: String,
    default: '',
  },
  value: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['input'])

const carsStore = useCarsStore()

const finalClass = computed(() => {
  const fixedStyle = 'block mt-1 border-1 rounded-lg form-input text-slate-600'

  return props.inputPlaceholder === 'description'
    ? `${fixedStyle} w-[337px]`
    : `${fixedStyle} w-[178px]`
})

function handleInput(event: Event) {
  if (props.inputPlaceholder === 'Code') {
    const element = event.target as HTMLButtonElement
    carsStore.code = alphanumeric(element.value)
    emit('input', carsStore.code)
  }
  else {
    const element = event.target as HTMLButtonElement
    carsStore.description = alphanumericAndSingleSpaces(element.value)
    emit('input', carsStore.description)
  }
}
</script>

<template>
  <input
    data-test="car-year-price"
    :placeholder="`${props.inputPlaceholder}`"
    :value="value"
    :class="finalClass"
    @input="handleInput"
  >
</template>
