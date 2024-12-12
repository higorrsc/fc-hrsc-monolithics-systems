import dotenv from "dotenv";
import { migrator } from "./db.config";
import { app } from "./express";

dotenv.config();
const port: number = Number(process.env.PORT) || 3000;

async function main() {
  await migrator.up();

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

main();
