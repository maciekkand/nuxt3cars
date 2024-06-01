<script setup>
import { useCarsStore } from '../stores/carsStore'

const carsStore = useCarsStore()

const showDeleteModal = ref(false)
const showUpdateModal = ref(false)
const currentTruckId = ref(null)
const carId = ref(null)
const carCode = ref('')
const carBrand = ref('')
const carStatus = ref('')
const carDescription = ref('')

function getCars(obj) {
  const carsObj = {
    start: obj?.start,
    limit: obj?.limit,
    sort: obj?.sort,
    order: obj?.order,
  }

  carsStore.getCars(carsObj)
}

function deleteTruck(carId) {
  showDeleteModal.value = true
  currentTruckId.value = carId
}

async function shouldDelete(isDelete) {
  if (isDelete) {
    await removeTruck(currentTruckId.value)
    carsStore.getCars({})
    carsStore.filterCars({ queryString: carsStore.queryString })
  }

  showDeleteModal.value = false
}

function modifyTruck(car) {
  showUpdateModal.value = true
  carId.value = car.id
  carCode.value = car.code
  carBrand.value = car.brand
  carStatus.value = car.status
  carDescription.value = car.description
}

async function shouldUpdate(modifiedCar) {
  if (modifiedCar) {
    await updateTruck(modifiedCar.id, modifiedCar)
    carsStore.filterCars({ queryString: carsStore.queryString })
  }

  showUpdateModal.value = false
}

function addFavorite(itemId) {
  if (carsStore.getFavoriteIds.includes(itemId)) {
    carsStore.favorites = carsStore.favorites.filter((el) => {
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
  getCars()
  carsStore.getBrands()
  carsStore.getStatuses()
})
</script>

<template>
  <div class="relative min-h-[670px] w-full">
    <header>
      <h1 class="hidden text-3xl font-semibold 2xl:flex 2xl:justify-center 2xl:my-4">
        Cars
      </h1>
    </header>

    <div>
      <PopupModal
        v-if="showDeleteModal"
        message="Are you sure?"
        alt="delete-row-confirmation-modal"
        @should-delete="shouldDelete"
      />

      <UpdateModal
        v-if="showUpdateModal"
        message="Car update form"
        alt="update-row-confirmation-modal"
        :car-id="carId"
        :car-code="carCode"
        :car-brand="carBrand"
        :car-status="carStatus"
        :car-description="carDescription"
        @should-update="shouldUpdate"
      />

      <div
        class="leading-[3rem] grid w-full grid-cols-10 mt-12 text-xl bg-neutral-300"
      >
        <p class="pl-8">
          #
        </p>
        <p class="-ml-8">
          Code
        </p>
        <p class="-ml-10">
          Brand
        </p>
        <p class="-ml-5">
          Status
        </p>
        <p class="col-span-4 ml-4">
          Description
        </p>

        <p class="" />

        <NuxtImg
          v-if="carsStore.getFavoriteIds.length"
          class="h-10 mt-1 ml-[52px]"
          src="../public/heart-on.svg" alt="heart-on"
          @click="clearFavorites"
        />

        <NuxtImg
          v-if="!carsStore.getFavoriteIds.length"
          class="h-10 mt-1 ml-[52px]"
          src="../public/heart-off.svg"
          alt="heart-off"
        />
      </div>

      <ul
        v-for="item in carsStore.cars"
        :key="item.id"
        data-test="cars-table-row"
        class="grid w-full grid-cols-11 text-lg odd:bg-neutral-300"
        alt="cars-table"
      >
        <li
          data-test="cars-table-id"
          class="py-3 pl-8"
          alt="cars-table-car-id"
        >
          {{ item.id }}
        </li>

        <li
          data-test="cars-table-code"
          class="py-3 -ml-5 text-left"
          alt="cars-table-car-code"
        >
          {{ item.code }}
        </li>

        <li
          data-test="cars-table-brand"
          class="py-3 -ml-4"
          alt="cars-table-car-brand"
        >
          {{ item.brand }}
        </li>

        <li
          data-test="cars-table-status"
          class="w-32 py-3 ml-4"
          alt="cars-table-car-status"
        >
          {{ item.status }}
        </li>

        <li
          data-test="cars-table-description"
          class="col-span-5 py-3 ml-16 text-left"
          alt="cars-table-car-description"
        >
          {{ item.description }}
        </li>

        <li class="col-span-1">
          <button
            data-test="cars-table-update"
            class="w-24 h-8 my-2 -ml-20 text-sm text-white bg-green-800 rounded-lg"
            alt="update-button"
            @click="modifyTruck(item)"
          >
            Update
          </button>

          <button
            data-test="cars-table-delete"
            class="w-16 h-8 my-4 ml-6 text-sm text-white bg-red-800 rounded-lg"
            alt="delete-button"
            @click="deleteTruck(item.id)"
          >
            Del
          </button>
        </li>

        <li class="col-span-1">
          <NuxtImg
            v-if="carsStore.getFavoriteIds.includes(item.id)"
            data-test="cars-table-favorite-on"
            src="../public/heart-on.svg"
            class="h-10 mt-3 ml-10 cursor-pointer"
            alt="heart-on"
            @click="addFavorite(item.id)"
          />

          <NuxtImg
            v-if="!carsStore.getFavoriteIds.includes(item.id)"
            data-test="cars-table-favorite-off"
            src="../public/heart-off.svg"
            class="h-10 mt-3 ml-10 cursor-pointer"
            alt="heart-off"
            @click="addFavorite(item.id)"
          />
        </li>
      </ul>
    </div>

    <TablePagination
      data-test="cars-table-pagination"
      class="flex justify-center mt-4 lg:mt-8"
      @new-pagination="getCars"
    />
  </div>
</template>
