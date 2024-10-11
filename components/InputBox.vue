<script setup lang='ts'>
import { useCarsStore } from '@/stores/carsStore'
import type { InputProps } from '@/types/types'

const { inputPlaceholder, value } = defineProps<InputProps>()

const emit = defineEmits<{
  (e: 'input', value: string): void
}>()

const carsStore = useCarsStore()

const finalClass = computed(() => {
  const fixedStyle = 'block mt-1 border-1 rounded-lg form-input text-slate-600'

  return inputPlaceholder === 'description'
    ? `${fixedStyle} w-[337px]`
    : `${fixedStyle} w-[178px]`
})

function handleInput(event: Event) {
  if (inputPlaceholder === 'Code') {
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
    :placeholder="`${inputPlaceholder}`"
    :value="value"
    :class="finalClass"
    @input="handleInput"
  >
</template>
