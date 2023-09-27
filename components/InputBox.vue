<template>
  <div>
      <input
        :type="inputBoxType"
        :class="boxSizes"
        :placeholder="`${inputPlaceholder}`"
        maxlength="20"
        :min="minNumber"
        :max="maxNumber"
        :step="stepNumber"
        :value="value"
        @input="handleInput"
      />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const emit = defineEmits(['input'])

const props = defineProps({
  stringInput: Boolean,
  inputPlaceholder: String,
  value: String,
  minNumber: Number,
  maxNumber: Number,
  stepNumber: Number
})

const boxSizes = computed(() => {
  const fixedStyles = 'block mt-1 border-1 rounded-lg form-input text-slate-600'
  return props.stringInput ? `${fixedStyles} w-[170px]` : `${fixedStyles} w-[95px]`
})

const inputBoxType = computed(() => {
  return props.stringInput ? 'text' : 'number'
})

function handleInput(event) {
  emit('input', event.target.value)
}
</script>
