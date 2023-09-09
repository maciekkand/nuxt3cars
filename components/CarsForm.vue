<template>
  <div>
    <header>
      <h1 class="flex justify-center my-6 text-3xl font-semibold 2xl:hidden">CarsTable</h1>
    </header>

    <div class="h-4 border border-white w-72">
      <CarsAlert
        v-if="showAlert"
        :type="alertType"
        :message="alertMessage"
        class="ml-10 -mt-6 2xl:mt-8 2xl:ml-0"
      />
    </div>

    <div class="flex justify-center gap-2 md:gap-7 2xl:my-6 2xl:flex-col 2xl:mr-8 2xl:mt-[5.5rem] 2xl:gap-[23px] 2xl:text-lg">

      <InputBox
        :value="brand"
        :stringInput=true
        inputPlaceholder="car brand"
        alt="car-name"
        @input="setBrand"
      />

      <InputBox
        :value="year"
        :stringInput=false
        inputPlaceholder="year"
        :minNumber="1900"
        :maxNumber="2050"
        alt="car-year"
        @input="setYear"
      />

      <InputBox
        :value="color"
        :stringInput=true
        inputPlaceholder="color"
        alt="car-color"
        @input="setColor"
      />

      <InputBox
        :value="price"
        :stringInput=false
        inputPlaceholder="price"
        :minNumber="100"
        :maxNumber="100000"
        :stepNumber="100"
        alt="car-price"
        @input="setPrice"
      />

      <!-- <button
        @click="filterItems"
        class="w-24 h-[42px] text-xl text-white bg-blue-600 rounded-lg mt-[4px] 2xl:mt-[18px]  disabled:opacity-50"
        alt="filter-car-button"
        :disabled="filterButtonDisabled"
      >Filter</button> -->

      <button
        @click="addItem"
        class="w-24 h-[42px] text-xl text-white bg-blue-600 rounded-lg mt-[4px] 2xl:mt-[18px]"
        alt="add-car-button"
      >Add</button>

      <button
        @click="showFavorites"
        class="w-24 h-[42px] text-xl text-white bg-blue-600 rounded-lg mt-[4px] 2xl:mt-[18px]  disabled:opacity-50"
        alt="show-favorite-cars"
        :disabled="favoritesButtonDisabled"
      >Favs</button>

      <button
        @click="resetValidation"
        class="w-24 h-[42px] text-xl text-white bg-blue-600 rounded-lg mt-[4px]"
        alt="reset-form-button"
      >Reset</button>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { useCarsStore } from '../stores/carsStore'
import InputBox from './InputBox.vue'
import CarsAlert from './CarsAlert.vue';
import { alphanumericAndSingleSpaces } from '../utils/sanitizer'

const carsStore = useCarsStore()

const brand = ref('')
const year = ref('')
const color = ref('')
const price = ref('')
const showAlert = ref(false)
const alertType = ref('')
const alertMessage = ref('')

const favoritesButtonDisabled = computed(() => {
  return !carsStore.favorites.length
})

const filterButtonDisabled = computed(() => {
  if(!brand.value && !year.value && !color.value && !price ) {
    return true
  }
})

function setBrand(param) {
  brand.value = param
  debouncedFn()
}

function setYear(param) {
  year.value = param
  debouncedFn()
}

function setColor(param) {
  color.value = param
  debouncedFn()
}

function setPrice(param) {
  price.value = param
  debouncedFn()
}

function resetValidation() {
  showAlert.value = false
  brand.value = ''
  year.value = ''
  color.value = ''
  price.value = ''
  carsStore.getRows({})
}

function validate() {
  let message = ''
  brand.value = alphanumericAndSingleSpaces(brand.value)

  if (brand.value.length < 3) {
    message = 'Name is too short (3-20)'
  }
  else if (year.value < 1900) {
    message = 'Year should be 1900+'
  }
  else if (!color.value || color.value.length < 3) {
    message = 'Color is missing or too short (3+)'
  }
  else if (price.value < 100 || price.value > 100000) {
    message = 'Price should be 100-100,000'
  }

  return message ? displayAlert('error', message) : true
}

function displayAlert(type, message) {
  showAlert.value = true
  alertType.value = type
  alertMessage.value = message
}

async function addItem() {
  if (!validate()) return

  const obj = {
    brand: brand.value,
    year: year.value,
    color: color.value,
    price: price.value
  }

  await carsStore.addRow(obj)

  resetValidation()
  carsStore.getRows({ sort:'id', order:'desc'})

  showAlert.value = true
  alertType.value = 'info'
  alertMessage.value = 'Added successfully'
}

function filterItems() {
  const carObj = {}
  brand.value && (carObj.brand = brand.value)
  year.value && (carObj.year = year.value)
  color.value && (carObj.color = color.value)
  price.value && (carObj.price = price.value)

  carsStore.filterRows(carObj)
  carsStore.isFilter = true
}

function showFavorites() {
  navigateTo("FavoritesPage")
}

const debouncedFn = useDebounceFn(() => {
  filterItems()
}, 300)

</script>
