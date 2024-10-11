import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Car, QueryString } from '@/types/types'

export const useCarsStore = defineStore('carsStore', () => {
  const cars = ref<Car[]>([])
  const brands = ref<string[]>([])
  const statuses = ref<string[]>([])
  const carsCount = ref(0)
  const code = ref('')
  const description = ref('')
  const queryString = ref('')
  const favorites = ref<Car[]>([])
  const rowsNumber = ref(10)

  const getFavoriteIds = computed(() => favorites.value.map((el: Car) => el.id!))

  function clearFavorites() {
    favorites.value = []
  }

  function getCars(params: object) {
    fetchCars(params)
      .then((res: Car[]) => cars.value = res)
      .catch(err => console.error(err))
  }

  function getBrands() {
    fetchBrands()
      .then((res: string[]) => brands.value = res)
      .catch(err => console.error(err))
  }

  function getStatuses() {
    fetchStatuses()
      .then((res: string[]) => statuses.value = res)
      .catch(err => console.error(err))
  }

  function filterCars(obj: Car | QueryString) {
    filterItems(obj)
      .then((res: Car[]) => cars.value = res)
      .catch(err => console.error(err))
  }

  function addFavorite(itemId: string) {
    if (getFavoriteIds.value.includes(itemId)) {
      favorites.value = favorites.value.filter((el: Car) => {
        return el.id !== itemId
      })
    }
    else {
      const favoredCar: Car = cars.value.filter((el: Car) => el.id === itemId)[0]
      favorites.value.push(favoredCar)
    }
  }

  return {
    cars,
    brands,
    statuses,
    carsCount,
    code,
    description,
    queryString,
    favorites,
    rowsNumber,
    getFavoriteIds,
    clearFavorites,
    getCars,
    getBrands,
    getStatuses,
    filterCars,
    addFavorite,
  }
})
