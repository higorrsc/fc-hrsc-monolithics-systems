import dotenv from "dotenv";
<<<<<<< HEAD
import { migrator } from "./db.config";
=======
import { Sequelize } from "sequelize-typescript";
import { Umzug } from "umzug";
import { ClientModel } from "../../modules/client-adm/repository/client.model";
import { InvoiceItemModel } from "../../modules/invoice/repository/invoice-item.model";
import { InvoiceModel } from "../../modules/invoice/repository/invoice.model";
import { TransactionModel } from "../../modules/payment/repository/transaction.model";
import { ProductModel } from "../../modules/product-adm/repository/product.model";
import { ProductModel as ProductStoreCatalogModel } from "../../modules/store-catalog/repository/product.model";
import { migrator } from "../migrations/config/migrator";
>>>>>>> 84f55c57fd4281882faca8cd25a5c391224c1a12
import { app } from "./express";

dotenv.config();
const port: number = Number(process.env.PORT) || 3000;

<<<<<<< HEAD
async function main() {
  await migrator.up();

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

main();
=======
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
  // await migration.up();
}
setupDb();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
>>>>>>> 84f55c57fd4281882faca8cd25a5c391224c1a12
