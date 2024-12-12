import { join } from "path";
<<<<<<< HEAD
import { Model, ModelCtor, Sequelize } from "sequelize-typescript";
import { SequelizeStorage, Umzug } from "umzug";

// export const migrator = (sequelize: Sequelize) => {
//   return new Umzug({
//     migrations: {
//       glob: [
//         "infrastructure/migrations/migrations/*.{js,ts}",
//         {
//           cwd: join(__dirname, "../../../"),
//           ignore: ["**/*.d.ts", "**/*.spec.ts", "**/index.js", "**/index.ts"],
//         },
//       ],
//     },
//     context: sequelize,
//     storage: new SequelizeStorage({ sequelize }),
//     logger: console,
//   });
// };

export type MigratorProps = {
  models: ModelCtor<Model>[];
  sequelize?: Sequelize | undefined;
  migrationsDir?: string | undefined;
};

export class Migrator {
  private _sequelize: Sequelize;
  private _migrator: Umzug<any>;

  constructor(props: MigratorProps) {
    this._sequelize =
      props.sequelize ||
      new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
      });
    this._sequelize.addModels(props.models);
    const migrationsDir = props.migrationsDir || join(__dirname, "../../../");
    this._migrator = new Umzug({
      migrations: {
        glob: [
          "infrastructure/migrations/migrations/*.{js,ts}",
          {
            cwd: migrationsDir,
            ignore: ["**/*.d.ts", "**/*.spec.ts", "**/index.js", "**/index.ts"],
          },
        ],
      },
      context: this._sequelize,
      storage: new SequelizeStorage({ sequelize: this._sequelize }),
      logger: console,
    });
  }

  public async up(): Promise<void> {
    await this._migrator.up();
  }

  public async down(): Promise<void> {
    await this._migrator.down();
    await this._sequelize.close();
  }
}
=======
import { Sequelize } from "sequelize-typescript";
import { SequelizeStorage, Umzug } from "umzug";

export const migrator = (sequelize: Sequelize) => {
  return new Umzug({
    migrations: {
      glob: [
        "infrastructure/migrations/migrations/*.{js,ts}",
        {
          cwd: join(__dirname, "../../../"),
          ignore: ["**/*.d.ts", "**/*.spec.ts", "**/index.js", "**/index.ts"],
        },
      ],
    },
    context: sequelize,
    storage: new SequelizeStorage({ sequelize }),
    logger: console,
  });
};
>>>>>>> 84f55c57fd4281882faca8cd25a5c391224c1a12
