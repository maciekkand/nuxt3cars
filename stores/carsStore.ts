import { defineStore } from 'pinia'
import type { Car, QueryString } from '../types/types.ts'

export const useCarsStore = defineStore('carsStore', {
  state: () => ({
    cars: [] as Car[],
    brands: [] as string[],
    statuses: [] as string[],
    carsCount: 0,
    code: '',
    description: '',
    queryString: '',
    favorites: [] as Car[],
  }),

  getters: {
    getFavoriteIds(): string[] {
      return this.favorites.map(el => el.id!)
    },
  },

  actions: {
    clearFavorites() {
      this.favorites = []
    },

    getCars(params: object) {
      fetchCars(params)
        .then((res: Car[]) => this.cars = res)
        .catch(err => console.log(err))
    },

    getBrands() {
      fetchBrands()
        .then((res: string[]) => this.brands = res)
        .catch(err => console.log(err))
    },

    getStatuses() {
      fetchStatuses()
        .then((res: string[]) => this.statuses = res)
        .catch(err => console.log(err))
    },

    filterCars(obj: Car | QueryString) {
      filterItems(obj)
        .then((res: Car[]) => this.cars = res)
        .catch(err => console.log(err))
    },

    addFavorite(itemId: string) {
      if (this.getFavoriteIds.includes(itemId)) {
        this.favorites = this.favorites.filter((el: Car) => {
          return el.id !== itemId
        })
      }
      else {
        const favoredCar: Car = this.cars.filter((el: Car) => el.id === itemId)[0]
        this.favorites.push(favoredCar)
      }
    },
  },
})
