import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import { Umzug } from "umzug";
import { ClientModel } from "../../modules/client-adm/repository/client.model";
import { InvoiceItemModel } from "../../modules/invoice/repository/invoice-item.model";
import { InvoiceModel } from "../../modules/invoice/repository/invoice.model";
import { TransactionModel } from "../../modules/payment/repository/transaction.model";
import { ProductModel } from "../../modules/product-adm/repository/product.model";
import { ProductModel as ProductStoreCatalogModel } from "../../modules/store-catalog/repository/product.model";
import { migrator } from "../migrations/config/migrator";
import { checkoutRoute } from "./routes/checkout.route";
import { clientRoute } from "./routes/client.route";
import { invoiceRoute } from "./routes/invoice.route";
import { productRoute } from "./routes/product.route";

export const app: Express = express();
app.use(express.json());
app.use("/clients", clientRoute);
app.use("/products", productRoute);
app.use("/checkout", checkoutRoute);
app.use("/invoice", invoiceRoute);

export let sequelize: Sequelize;
export let migration: Umzug<any>;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
    // sync: { force: true },
  });
  sequelize.addModels([
    ProductModel,
    ProductStoreCatalogModel,
    ClientModel,
    TransactionModel,
    InvoiceModel,
    InvoiceItemModel,
  ]);
  // await sequelize.sync();
  migration = migrator(sequelize);
  await migration.up();
}
setupDb();
