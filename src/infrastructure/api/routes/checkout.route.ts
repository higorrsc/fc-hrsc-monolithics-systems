import express, { Request, Response } from "express";
import CheckoutGateway from "../../../modules/checkout/gateway/checkout.gateway";
import { OrderRepository } from "../../../modules/checkout/repository/order.repository";
import { PlaceOrderInputDto } from "../../../modules/checkout/usecase/place-order/place-order.dto";
import PlaceOrderUseCase from "../../../modules/checkout/usecase/place-order/place-order.usecase";
import ClientAdmFacadeFactory from "../../../modules/client-adm/factory/client-adm.facade.factory";
import InvoiceFacadeFactory from "../../../modules/invoice/factory/invoice.facade.factory";
import PaymentFacadeFactory from "../../../modules/payment/factory/payment.facade.factory";
import ProductAdmFacadeFactory from "../../../modules/product-adm/factory/product-adm.facade.factory";
import StoreCatalogFacadeFactory from "../../../modules/store-catalog/factory/store-catalog.facade.factory";

export const checkoutRoute = express.Router();
checkoutRoute.post("/", async (req: Request, res: Response) => {
  try {
    const clientFacade = ClientAdmFacadeFactory.create();
    const productFacade = ProductAdmFacadeFactory.create();
    const catalogFacade = StoreCatalogFacadeFactory.create();
    const invoiceFacade = InvoiceFacadeFactory.create();
    const paymentFacade = PaymentFacadeFactory.create();
    const repository: CheckoutGateway = new OrderRepository();

    const useCase = new PlaceOrderUseCase(
      clientFacade,
      productFacade,
      catalogFacade,
      repository,
      invoiceFacade,
      paymentFacade
    );

    const input: PlaceOrderInputDto = {
      clientId: req.body.clientId,
      products: req.body.products,
    };
    const output = await useCase.execute(input);
    res.status(201).send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});
