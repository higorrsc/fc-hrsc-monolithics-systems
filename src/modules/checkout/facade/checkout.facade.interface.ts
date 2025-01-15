import {
  CheckoutFacadeInputDto,
  CheckoutFacadeOutputDto,
} from './checkout.facade.dto'

export default interface CheckoutFacadeInterface {
  placeOrder(input: CheckoutFacadeInputDto): Promise<CheckoutFacadeOutputDto>
}
