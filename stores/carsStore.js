import { defineStore } from 'pinia'

export const useCarsStore = defineStore('carsStore', {
  state: () => ({
    cars: [],
    brands: [],
    statuses: [],
    carsCount: null,
    code: '',
    description: '',
    queryString: '',
    favorites: [],
  }),

  getters: {
    getFavoriteIds() {
      return this.favorites.map(el => el.id)
    },
  },

  actions: {
    clearFavorites() {
      this.favorites = []
    },

    getCars(params) {
      fetchCars(params)
        .then(res => this.cars = res)
        .catch(err => console.log(err))
    },

    getBrands() {
      fetchBrands()
        .then(res => this.brands = res)
        .catch(err => console.log(err))
       },

    getStatuses() {
      fetchStatuses()
        .then(res => this.statuses = res)
        .catch(err => console.log(err))
    },

    filterCars(obj) {
      filterItems(obj)
        .then(res => this.cars = res)
        .catch(err => console.log(err))
    },
  },
})
