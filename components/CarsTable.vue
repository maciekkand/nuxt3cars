<script setup lang='ts'>
import type { Car, CarsSearch } from '@/types/types'
import { useCarsStore } from '@/stores/carsStore'

const carsStore = useCarsStore()

const showDeleteModal = ref(false)
const showUpdateModal = ref(false)
const currentCarId = ref()
const carId = ref()
const carCode = ref('')
const carBrand = ref('')
const carStatus = ref('')
const carDescription = ref('')

function getCars(obj: CarsSearch): void {
  const carsObj: {
    start?: number
    limit?: number
    sort?: string
    order?: string
  } = {
    start: obj?.start,
    limit: obj?.limit,
  }

  if (obj.sort) {
    carsObj.sort = obj.sort
  }

  if (obj.order) {
    carsObj.order = obj.order
  }

  carsStore.queryString = String(new URLSearchParams(carsObj as Record<string, string>))
  carsStore.getCars(carsObj)
}

function deleteCar(carId: number) {
  showDeleteModal.value = true
  currentCarId.value = carId
}

async function shouldDelete(isDelete: boolean) {
  if (isDelete) {
    await removeCar(currentCarId.value)
    carsStore.getCars({})
    carsStore.filterCars({ queryString: carsStore.queryString })
  }

  showDeleteModal.value = false
}

function modifyCar(car: Car) {
  showUpdateModal.value = true
  carId.value = String(car.id)!
  carCode.value = car.code
  carBrand.value = car.brand
  carStatus.value = car.status
  carDescription.value = car.description
}

async function carUpdate(modifiedCar: Car) {
  if (modifiedCar) {
    await updateCar(modifiedCar.id!, modifiedCar)
    carsStore.filterCars({ queryString: carsStore.queryString })
  }

  showUpdateModal.value = false
}

function addFavorite(itemId: string) {
  carsStore.addFavorite(itemId)
}

function clearFavorites() {
  carsStore.clearFavorites()
}

onMounted(() => {
  getCars({ start: 0, limit: carsStore.rowsNumber, sort: 'id', order: 'asc' })
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
        @car-update="carUpdate"
      />

      <div class="leading-[3rem] grid w-full grid-cols-10 mt-12 text-xl bg-neutral-300">
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
        <CarRow
          :item="item"
          @modify-car="modifyCar"
          @delete-car="deleteCar"
          @add-favorite="addFavorite"
        />
      </ul>
    </div>

    <TablePagination
      data-test="cars-table-pagination"
      class="flex justify-center mt-4 lg:mt-8"
      @new-pagination="getCars"
    />
  </div>
</template>
