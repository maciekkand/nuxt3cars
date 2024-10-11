import { $fetch } from 'ofetch'
import type { Car, QueryString } from '@/types/types'
import { useCarsStore } from '~/stores/carsStore'

const BASE_URL = 'http://localhost:4000'

export function fetchBrands() {
  return $fetch(`${BASE_URL}/brands`)
}

export function fetchStatuses() {
  return $fetch(`${BASE_URL}/statuses`)
}

export function fetchCars({ start = 0, sort = 'id', order = 'asc' }) {
  const carsStore = useCarsStore()

  return $fetch(`${BASE_URL}/cars?_start=${start}&_limit=${carsStore.rowsNumber}&_sort=${sort}&_order=${order}`, {
    onResponse(context) {
      carsStore.carsCount = Number(context.response.headers.get('X-Total-Count'))
    },
  })
}

export function isCarCodeUnique(newCarCode: string) {
  return $fetch(`${BASE_URL}/cars`)
    .then((res) => {
      const allCodes = res.map((el: Car) => el.code)
      const codeAlreadyExists = allCodes.includes(newCarCode)

      return !codeAlreadyExists
    })
    .catch(err => console.log(err))
}

export function removeCar(id: number) {
  return $fetch(`${BASE_URL}/cars/${id}`, {
    method: 'DELETE',
  })
}

export function insertCar(obj: Car) {
  return $fetch(`${BASE_URL}/cars`, {
    method: 'POST',
    body: obj,
  })
}

export function updateCar(id: string, obj: Car) {
  return $fetch(`${BASE_URL}/cars/${id}`, {
    method: 'PUT',
    body: obj,
  })
}

export function filterItems(obj: Car | QueryString) {
  const carsStore = useCarsStore()
  let finalQueryString = ''

  for (const key in obj) {
    if (!obj[key]) {
      delete obj[key]
    }
  }

  if (obj.queryString) {
    finalQueryString = obj.queryString
      .replace(/^start/, '_start')
      .replace(/&limit/, '&_limit')
  }
  else {
    const queryString = String(new URLSearchParams(obj as Record<string, string>))

    finalQueryString = queryString
      .replace('code', 'code_like')
      .replace('description', 'description_like')

    finalQueryString = `${finalQueryString}&_limit=${carsStore.rowsNumber}&_sort=id&_order=ASC`
  }

  carsStore.queryString = finalQueryString

  return $fetch(`${BASE_URL}/cars?${finalQueryString}`)
}
