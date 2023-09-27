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
          :value="props.carBrand"
          inputName="Brand"
          :stringInput=true
          inputPlaceholder="car brand"
          alt="car-name"
          @input="setBrand"
        />

        <InputBox
          :value="props.carYear"
          inputName="Year"
          :stringInput=false
          inputPlaceholder="year"
          :minNumber=1900
          :maxNumber=2050
          alt="car-year"
          @input="setYear"
        />

        <InputBox
          :value="props.carColor"
          inputName="Color"
          :stringInput=true
          inputPlaceholder="color"
          alt="car-color"
          @input="setColor"
        />

        <InputBox
          :value="props.carPrice"
          inputName="Price"
          :stringInput=false
          inputPlaceholder="price"
          :minNumber=100
          :maxNumber=100000
          :stepNumber=100
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
import { ref } from 'vue'
import InputBox from './InputBox.vue'
import CarsAlert from './CarsAlert.vue';

const emit = defineEmits(['shouldUpdate'])

const props = defineProps({
  message: String,
  carId: Number,
  carBrand: String,
  carYear: String,
  carColor: String,
  carPrice: String
})

let newBrand = props.carBrand
let newYear = props.carYear
let newColor = props.carColor
let newPrice = props.carPrice

const showAlert = ref(false)
const alertType = ref('')
const alertMessage = ref('')

function setBrand(param) {
  newBrand = param
}

function setYear(param) {
  newYear = param
}

function setColor(param) {
  newColor = param
}

function setPrice(param) {
  newPrice = Number(param)
}

function displayAlert(type, message) {
  showAlert.value = true
  alertType.value = type
  alertMessage.value = message
}

function shouldUpdate(shouldUpdate) {
  alertMessage.value = ''

  if (!shouldUpdate) {
    return emit('shouldUpdate')
  }

  if (!newPrice) {
    alertMessage.value = `Please fill in the 'Price' field`
  }

  if (!newColor) {
    alertMessage.value = `Please fill in the 'Color' field`
  }

  if (!newYear) {
    alertMessage.value = `Please fill in the 'Year' field`
  }

  if (!newBrand) {
    alertMessage.value = `Please fill in the 'Brand' field`
  }

  if (alertMessage.value) {
    return displayAlert('error', alertMessage.value)
  }

  const modifiedCar = {
    id: props.carId,
    brand: newBrand,
    year: newYear,
    color: newColor,
    price: newPrice
  }

  emit('shouldUpdate', modifiedCar)
}

</script>
