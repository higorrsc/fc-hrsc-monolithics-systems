export interface GenerateInvoiceFacadeInputDto {
  id?: string
  name: string
  document: string
  street: string
  number: string
  complement: string
  city: string
  state: string
  zipCode: string
  items: {
    id: string
    name: string
    price: number
    quantity: number
  }[]
}

export interface FindInvoiceFacadeInputDto {
  id: string
}

export interface FindInvoiceFacadeOutputDto {
  id: string
  name: string
  document: string
  address: {
    street: string
    number: string
    complement: string
    city: string
    state: string
    zipCode: string
  }
  items: {
    id: string
    name: string
    price: number
    quantity: number
  }[]
  total: number
  createdAt: Date
}
