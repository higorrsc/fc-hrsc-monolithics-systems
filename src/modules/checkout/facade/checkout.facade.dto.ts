export interface CheckoutFacadeInputDto {
  clientId: string
  products: {
    productId: string
    quantity: number
  }[]
}

export interface CheckoutFacadeOutputDto {
  id: string
  invoiceId: string
  clientId: string
  status: string
  total: number
  products: {
    productId: string
    quantity: number
  }[]
}
