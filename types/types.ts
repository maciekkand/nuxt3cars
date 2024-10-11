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

export interface CardProps {
  id: string
  code: string
  brand: string
  status: string
  description?: string
}

export interface BrandProps {
  brand: string
}

export interface PopupProps {
  message: string
}

export interface AlertProps {
  type: string
  message: string
}

export interface RowProps {
  item: {
    id?: number
    code: string
    brand: string
    status: string
    description: string
  }
}

export interface InputProps {
  inputPlaceholder?: string
  value?: string
}

export interface SelectProps {
  type: string
  value: string
  update?: boolean
}

export interface UpdateProps {
  message?: string
  carId: string
  carCode: string
  carBrand: string
  carStatus: string
  carDescription?: string
}
