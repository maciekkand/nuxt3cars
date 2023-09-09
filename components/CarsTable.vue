<template>
  <div class="min-h-[670px]">
    <header>
      <h1 class="hidden text-3xl font-semibold 2xl:flex 2xl:justify-center 2xl:my-6">CarsTable</h1>
    </header>

    <div>
      <PopupModal
        v-if="showModal"
        message="Are you sure?"
        @shouldDelete="shouldDelete"
        alt="delete-row-confirmation-modal"
      />

      <UpdateModal
        v-if="showUpdateModal"
        message="Car update form"
        @shouldUpdate="shouldUpdate"
        alt="delete-row-confirmation-modal"
        :carId="carId"
        :carBrand="carBrand"
        :carYear="carYear"
        :carColor="carColor"
        :carPrice="carPrice"
      />

      <div class="leading-[3rem] grid w-full grid-cols-9 mt-12 text-xl bg-neutral-300 cursor-pointer">
        <p
          @click="sortBy('id')"
          class="pl-8 "
        >Id &#x21f5;</p>

        <p
          @click="sortBy('brand')"
          class="col-span-2  "
        >Brand &#x21f5;</p>

        <p
          @click="sortBy('year')"
          class="ml-4 "
        >Year &#x21f5;</p>

        <p
          @click="sortBy('color')"
          class="ml-4  "
        >Color &#x21f5;</p>

        <p
          @click="sortBy('price')"
          class="ml-4 "
        >Price &#x21f5;</p>

        <p class=""></p>
        <p class=""></p>

        <img
          v-if="carsStore.getFavoriteIds.length"
          @click="clearFavorites"
          class="w-10 h-10 mt-1" src="../assets/heart-on.svg"
          alt="heart-on"
        />

        <img
          v-if="!carsStore.getFavoriteIds.length"
          class="w-10 h-10 mt-1"
          src="../assets/heart-off.svg"
          alt="heart-off"
        />

      </div>

      <ul
        v-for="item in carsStore.cars"
        :key="item.id"
        class="grid w-full grid-cols-9 text-lg odd:bg-neutral-300"
        alt="cars-table"
      >
        <li class="py-3 pl-8" alt="cars-table-car-id">{{ item.id }}</li>
        <li class="col-span-2 py-3 text-left" alt="cars-table-car-brand">{{ item.brand }}</li>
        <li class="py-3 ml-4" alt="cars-table-car-year">{{ item.year }}</li>
        <li class="py-3 ml-4" alt="cars-table-car-color">{{ item.color }}</li>
        <li class="py-3 text-left ml-4" alt="cars-table-car-price">{{ item.price && item.price.toLocaleString() }}</li>

        <button
          @click="updateRow(item)"
          class="w-24 h-8 my-2 ml-6 text-sm text-white bg-green-800 rounded-lg"
          alt="update-button"
        >Update</button>

        <button
          @click="deleteRow(item.id)"
          class="w-16 h-8 my-2 ml-6 text-sm text-white bg-red-800 rounded-lg"
          alt="delete-button"
        >Del</button>

        <img
          v-if="carsStore.getFavoriteIds.includes(item.id)"
          @click="addFavorite(item.id)"
          src="../assets/heart-on.svg"
          class="w-10 h-10 mt-1"
          alt="heart-on"
        >

        <img
          v-if="!carsStore.getFavoriteIds.includes(item.id)"
          @click="addFavorite(item.id)"
          src="../assets/heart-off.svg"
          class="w-10 h-10 mt-1"
          alt="heart-off"
        >

      </ul>

      <Pagination
        @newPagination="getRows"
        class="flex justify-center mt-4 lg:mt-8"
      />

    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useCarsStore } from '../stores/carsStore'
import Favorites from './Favorites.vue'
import Pagination from './Pagination.vue'
import PopupModal from './PopupModal.vue'
import UpdateModal from './UpdateModal.vue'

const carsStore = useCarsStore()

const rows = ref([])
const favorites = ref([])
const idSortAsc = ref(false)
const brandSortAsc = ref(false)
const yearSortAsc = ref(false)
const colorSortAsc = ref(false)
const priceSortAsc = ref(false)
const showModal = ref(false)
const showUpdateModal = ref(false)
const currentRowId = ref(null)
const rowStart = ref(null)
const limit = ref(null)
const sortField = ref('')
let sortOrder = ref('')
const carId = ref(null)
const carBrand = ref('')
const carYear = ref(null)
const carColor = ref('')
const carPrice = ref(null)
const localSortAsc = ref(false)

function setSortFieldsAsc(excludedVariable) {
  const sortFields = ['id', 'brand', 'year', 'color', 'price']
  const filteredSortAscVariables = sortFields.map(el => el + 'SortAsc').filter(el => el != excludedVariable)

  filteredSortAscVariables.map(el => {
    eval(el).value = true
  })
}

function sortByFieldType(field, type) {
  if (type === 'numeric') {

    if (localSortAsc.value) {
      return carsStore.cars.sort ((a, b) => a[field] - b[field])
    }
    return carsStore.cars.sort ((a, b) => b[field] - a[field] )
  }

  if (localSortAsc.value) {
    return carsStore.cars.sort((a, b) => a[field].localeCompare(b[field]))
  }

  return carsStore.cars.sort((a, b) => b[field].localeCompare(a[field]))
}

function localDataSort(field) {
  let rowsSorted = []
  if (field === 'id' || field === 'year' || field === 'price') {
    rowsSorted = sortByFieldType(field, 'numeric')
  }
  else {
    rowsSorted = sortByFieldType(field, 'text')
  }

  carsStore.cars = rowsSorted
  localSortAsc.value = !localSortAsc.value
}

function fetchRows() {
  const carsObj = {
    start: rowStart.value,
    limit: limit.value,
    sort: sortField.value,
    order: sortOrder.value
  }

  carsStore.getRows(carsObj)
}

function sortBy(field) {
  if (carsStore.isFilter) {
    return localDataSort(field)
  }

  rowStart.value = 0
  sortField.value = field

  let sortVariableName = `${field}SortAsc`
  const boolValue = eval(sortVariableName).value

  sortOrder.value = ['desc', 'asc'][Number(boolValue)]
  fetchRows()

  eval(sortVariableName).value = !eval(sortVariableName).value
  setSortFieldsAsc(sortVariableName)
}

function getRows(obj) {
  rowStart.value = obj?.start
  limit.value = obj?.limit
  fetchRows()
}

function deleteRow(carId) {
  showModal.value = true
  currentRowId.value = carId
}

function shouldDelete(isDelete) {
  if (isDelete) {
    carsStore.deleteRow(currentRowId.value, limit.value)
  }
  showModal.value = false
}

function updateRow(car) {
  showUpdateModal.value = true
  carId.value = car.id
  carBrand.value = car.brand
  carYear.value = +car.year
  carColor.value = car.color
  carPrice.value = +car.price
}

function shouldUpdate(modifiedCar) {
  if (!modifiedCar) {
    return showUpdateModal.value = false
  }

  if (!modifiedCar.brand) {
      return alert('Brand field is missing')
  }

  if (modifiedCar.brand === carBrand.value
    && modifiedCar.year == carYear.value
    && modifiedCar.color === carColor.value
    && modifiedCar.price == carPrice.value) {
      return alert('No data has changed')
  }

  if (modifiedCar) {
    carsStore.modifyRow(modifiedCar.id, modifiedCar, limit.value)
  }
  showUpdateModal.value = false
}

function addFavorite(itemId) {
  if (carsStore.getFavoriteIds.includes(itemId)) {
    carsStore.favorites = carsStore.favorites.filter(el => {
      return el.id !== itemId
    })
  }
  else {
    const favoredCar = carsStore.cars.filter(el => el.id === itemId)[0]
    carsStore.favorites.push(favoredCar)
  }
}

function clearFavorites() {
  carsStore.clearFavorites()
}

onMounted(() => {
  getRows()
})
</script>
