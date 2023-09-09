import { defineStore } from 'pinia'
import { fetchRows, removeRow, updateRow, insertRow, filterItems } from '../utils/api'

export const useCarsStore = defineStore('carsStore', {
  state: () => ({
    cars: [],
    favorites: [],
    isFilter: false,
  }),

  getters: {
    getFavoriteIds() {
      return this.favorites.map(el => el.id)
    }
  },

  actions: {
    clearFavorites() {
      this.favorites = []
    },

    getRows(parameters) {
      fetchRows(parameters)
        .then(res => this.cars = res.data)
    },

    deleteRow(id, limit) {
      removeRow(id)
        .then(res => fetchRows({ limit }))
        .then(res => this.cars = res.data)
    },

    modifyRow(id, car, limit) {
      updateRow(id, car)
        .then(res => fetchRows({ limit }))
        .then(res => this.cars = res.data)
      },

    addRow(obj) {
      return insertRow(obj)
        .then(res => this.cars = res.data)
    },

    filterRows(obj) {
      filterItems(obj)
        .then(res => this.cars = res.data)
    }
  }
})
