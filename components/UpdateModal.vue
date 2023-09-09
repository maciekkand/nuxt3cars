<template>
  <div>
    <div class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 -mt-28">
      <div class="flex flex-col gap-3 p-8 ml-48  bg-white">

        <div class="flex justify-center mb-4">
          <h3 class="text-2xl">{{ message }}</h3>
        </div>

        <div class="h-4 border border-white w-72">
          <CarsAlert
            v-if="showAlert"
            :type="alertType"
            :message="alertMessage"
            class="-mt-1"
          />
        </div>

        <InputBox
          :value="brand"
          inputName="Brand"
          :stringInput=true
          inputPlaceholder="car brand"
          alt="car-name"
          @input="setBrand"
        />

        <InputBox
          :value="year"
          inputName="Year"
          :stringInput=false
          inputPlaceholder="year"
          :minNumber="1900"
          :maxNumber="2050"
          alt="car-year"
          @input="setYear"
        />

        <InputBox
          :value="color"
          inputName="Color"
          :stringInput=true
          inputPlaceholder="color"
          alt="car-color"
          @input="setColor"
        />

        <InputBox
          :value="price"
          inputName="Price"
          :stringInput=false
          inputPlaceholder="price"
          :minNumber="100"
          :maxNumber="100000"
          :stepNumber="100"
          alt="car-price"
          @input="setPrice"
        />

        <div class="mt-8">
          <button
            @click="shouldUpdate(true)"
            class="px-12 py-2 mr-12 text-white bg-blue-600 rounded"
          >Update</button>

          <button
            @click="shouldUpdate(false)"
            class="px-12 py-2 text-white bg-red-800 rounded"
          >Cancel</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import InputBox from './InputBox.vue'
import CarsAlert from './CarsAlert.vue';
import { alphanumericAndSingleSpaces } from '../utils/sanitizer'

const emit = defineEmits(['shouldUpdate'])

const props = defineProps({
  message: String,
  carId: Number,
  carBrand: String,
  carYear: Number,
  carColor: String,
  carPrice: Number
})

const newBrand = ref(null)
const newYear = ref(null)
const newColor = ref(null)
const newPrice = ref(null)
const showAlert = ref(false)
const alertType = ref('')
const alertMessage = ref('')

const brand = computed(() => {
  return props.carBrand
})

const year = computed(() => {
  return props.carYear
})

const color = computed(() => {
  return props.carColor
})

const price = computed(() => {
  return props.carPrice
})

function setBrand(param) {
  newBrand.value = param
}

function setYear(param) {
  newYear.value = param
}

function setColor(param) {
  newColor.value = param
}

function setPrice(param) {
  newPrice.value = param
}

function displayAlert(type, message) {
  showAlert.value = true
  alertType.value = type
  alertMessage.value = message
}

function shouldUpdate(shouldUpdate) {
  if (!shouldUpdate) {
    emit('shouldUpdate')
  }

  alertMessage.value = ''

  if (!newBrand.value) {
    alertMessage.value = `Please fill in the 'Brand' field`
  }
  else if (!newYear.value) {
    alertMessage.value = `Please fill in the 'Year' field`
  }
  else if (!newColor.value) {
    alertMessage.value = `Please fill in the 'Color' field`
  }
  else if (!newPrice.value) {
    alertMessage.value = `Please fill in the 'Price' field`
  }

  if (alertMessage.value) {
    return displayAlert('error', alertMessage.value)
  }

  const modifiedCar = {
    id: props.carId,
    brand: newBrand.value || props.carBrand,
    year: newYear.value || props.carYear,
    color: newColor.value || props.carColor,
    price: newPrice.value || props.carPrice
  }

  emit('shouldUpdate', shouldUpdate && modifiedCar)
}

</script>
