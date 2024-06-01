export interface Car {
  id?: string
  code: string
  brand: string
  status: string
  description: string
  queryString?: string
  [key: string]: string | undefined
}

export interface QueryString {
  queryString: string
  [key: string]: string | undefined
}

export interface CarsSearch {
  start: number
  limit: number
  sort: string | undefined
  order: 'asc' | 'desc' | undefined
}
