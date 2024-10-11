<script setup lang='ts'>
import { useDebounceFn } from '@vueuse/core'
import type { Car } from '@/types/types'
import { useCarsStore } from '@/stores/carsStore'

const carsStore = useCarsStore()

const code = ref('')
const brand = ref('')
const status = ref('')
const description = ref('')
const showAlert = ref(false)
const alertType = ref('')
const alertMessage = ref('')

const favoritesButtonDisabled = computed(() => {
  return !carsStore.favorites.length
})

const addButtonDisabled = computed(() => {
  const isFieldsFilled = code.value && brand.value && status.value
  return !isFieldsFilled
})

const debouncedFilterItems = useDebounceFn(() => {
  filterItems()
}, 300)

function updateBrandOrStatus(field: 'brand' | 'status', value: string) {
  const fields = { brand, status }
  fields[field].value = value

  filterItems()
}

function updateCodeOrDescription(field: 'code' | 'description', value: string) {
  const fields = { code, description }
  fields[field].value = value

  debouncedFilterItems()
}

function resetValidation(idSortOrder: 'asc' | 'desc') {
  showAlert.value = false
  code.value = ''
  brand.value = ''
  status.value = ''
  description.value = ''
  carsStore.getCars({ order: idSortOrder })
}

function displayAlert(type: string, message: string) {
  showAlert.value = true
  alertType.value = type
  alertMessage.value = message
}

async function addItem() {
  const isCodeUnique = await isCarCodeUnique(code.value)

  if (!isCodeUnique)
    return displayAlert('error', 'Car code must be unique')

  const obj = {
    code: code.value,
    brand: brand.value,
    status: status.value,
    description: description.value,
  }

  await insertCar(obj)

  resetValidation('desc')

  showAlert.value = true
  alertType.value = 'info'
  alertMessage.value = 'Added successfully'
}

function filterItems() {
  const carObj: Car = { id: '', code: '', brand: '', status: '', description: '' }

  if (code.value) {
    carObj.code = code.value
  }

  if (brand.value) {
    carObj.brand = brand.value
  }

  if (status.value) {
    carObj.status = status.value
  }

  if (description.value) {
    carObj.description = description.value
  }

  carsStore.filterCars(carObj)
}

function showFavorites() {
  navigateTo('FavoritesPage')
}
</script>

<template>
  <div>
    <header>
      <h1 class="flex justify-center my-4 text-3xl font-semibold 2xl:hidden">
        Cars
      </h1>
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
        :value="code"
        :string-input="true"
        data-test="car-code"
        input-placeholder="Code"
        alt="car-price"
        @input="updateCodeOrDescription('code', $event)"
      />

      <SelectBox
        type="Brand"
        data-test="car-brand"
        :value="brand"
        @input="updateBrandOrStatus('brand', $event)"
      />

      <SelectBox
        type="Status"
        data-test="car-status"
        :value="status"
        @input="updateBrandOrStatus('status', $event)"
      />

      <InputBox
        :value="description"
        :string-input="true"
        data-test="car-description"
        input-placeholder="Description"
        alt="car-price"
        @input="updateCodeOrDescription('description', $event)"
      />

      <button
        data-test="car-add-button"
        class="w-24 h-[42px] text-xl text-white bg-blue-600 rounded-lg mt-[4px] 2xl:mt-[18px] disabled:opacity-50"
        alt="add-car-button"
        :disabled="addButtonDisabled"
        @click="addItem"
      >
        Add
      </button>

      <button
        data-test="car-favs-button"
        class="w-24 h-[42px] text-xl text-white bg-blue-600 rounded-lg mt-[4px] 2xl:mt-[18px] disabled:opacity-50"
        alt="show-favorite-cars-button"
        :disabled="favoritesButtonDisabled"
        @click="showFavorites"
      >
        Favs
      </button>

      <button
        data-test="car-reset-button"
        class="w-24 h-[42px] text-xl text-white bg-blue-600 rounded-lg mt-[4px] 2xl:mt-[18px] disabled:opacity-50"
        alt="reset-form-button"
        @click="resetValidation('asc')"
      >
        Reset
      </button>
    </div>
  </div>
</template>
