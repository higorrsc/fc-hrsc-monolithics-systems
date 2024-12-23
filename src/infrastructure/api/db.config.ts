import { Sequelize } from 'sequelize-typescript'
import { OrderItemModel } from '../../modules/checkout/repository/order-item.model'
import { OrderModel } from '../../modules/checkout/repository/order.model'
import { ClientModel } from '../../modules/client-adm/repository/client.model'
import { InvoiceItemModel } from '../../modules/invoice/repository/invoice-item.model'
import { InvoiceModel } from '../../modules/invoice/repository/invoice.model'
import { TransactionModel } from '../../modules/payment/repository/transaction.model'
import { ProductModel } from '../../modules/product-adm/repository/product.model'
import { ProductModel as ProductStoreCatalogModel } from '../../modules/store-catalog/repository/product.model'
import { Migrator } from '../migrations/config/migrator'

const sequelize: Sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false,
})

export const migrator: Migrator = new Migrator({
  models: [
    ProductModel,
    ProductStoreCatalogModel,
    ClientModel,
    TransactionModel,
    OrderModel,
    OrderItemModel,
    InvoiceModel,
    InvoiceItemModel,
  ],
  sequelize,
})

export function CreateMigrator(): Migrator {
  return new Migrator({
    models: [
      ProductModel,
      ProductStoreCatalogModel,
      ClientModel,
      TransactionModel,
      OrderModel,
      OrderItemModel,
      InvoiceModel,
      InvoiceItemModel,
    ],
  })
}
