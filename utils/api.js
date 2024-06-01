import { useCarsStore } from '~/stores/carsStore'

const BASE_URL = 'http://localhost:4000'

export function fetchBrands() {
  return $fetch(`${BASE_URL}/brands`)
}

export function fetchStatuses() {
  return $fetch(`${BASE_URL}/statuses`)
}

export function fetchCars({ start = 0, limit = 10, sort = 'id', order = 'asc' }) {
  const carsStore = useCarsStore()

  return $fetch(`${BASE_URL}/cars?_start=${start}&_limit=${limit}&_sort=${sort}&_order=${order}`, {
    onResponse(context) {
      carsStore.carsCount = context.response.headers.get('X-Total-Count')
    },
  })
}

export function isTruckCodeUnique(newTruckCode) {
  return $fetch(`${BASE_URL}/cars`)
    .then((res) => {
      const allCodes = res.map(el => el.code)
      const codeAlreadyExists = allCodes.includes(newTruckCode)

      return !codeAlreadyExists
    })
    .catch(err => console.log(err))
}

export function removeTruck(id) {
  return $fetch(`${BASE_URL}/cars/${id}`, {
    method: 'DELETE',
  })
}

export function insertTruck(obj) {
  return $fetch(`${BASE_URL}/cars`, {
    method: 'POST',
    body: obj,
  })
}

export function updateTruck(id, obj) {
  return $fetch(`${BASE_URL}/cars/${id}`, {
    method: 'PUT',
    body: obj,
  })
}

export function filterItems(obj) {
  const carsStore = useCarsStore()
  let finalQueryString = ''

  if (obj.queryString) {
    finalQueryString = obj.queryString
  }
  else {
    const queryString = String(new URLSearchParams(obj))

    finalQueryString = queryString
      .replace('code', 'code_like')
      .replace('brand', 'brand_like')
      .replace('description', 'description_like')

    finalQueryString = `${finalQueryString}&_sort=id&_order=ASC`
  }

  carsStore.queryString = finalQueryString

  return $fetch(`${BASE_URL}/cars?${finalQueryString}`)
}
