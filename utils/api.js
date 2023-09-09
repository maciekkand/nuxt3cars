import axios from 'axios'

const BASE_URL = 'http://localhost:4000'

export function fetchRows({start=0, limit=10, sort='id', order='asc'}) {
  return axios.get(`${BASE_URL}/rows?_start=${start}&_limit=${limit}&_sort=${sort}&_order=${order}`, {
    headers: {
      "Content-Type": "application/json",
    },
  })
  .catch((error) => console.error(error));
}

export function removeRow(id) {
  return axios.delete(`${BASE_URL}/rows/${id}`)
    .catch((error) => console.error(error));
}

export function insertRow(obj) {
  return axios.post(`${BASE_URL}/rows`, obj)
    .catch((error) => console.error(error));
}

export function updateRow(id, obj) {
  return axios.patch(`${BASE_URL}/rows/${id}`, obj)
    .catch((error) => console.error(error));
}

export function filterItems(obj) {

  const queryString = String(new URLSearchParams(obj));

  let finalQueryString = queryString
    .replace('brand', 'brand_like')
    .replace('year', 'year_gte')
    .replace('color', 'color_like')
    .replace('price', 'price_lte')

  finalQueryString = finalQueryString + '&_sort=price&_order=ASC'

  return axios.get(`${BASE_URL}/rows?${finalQueryString}`, {
    headers: {
      "Content-Type": "application/json",
    },
  })
  .catch((error) => console.error(error));
}
