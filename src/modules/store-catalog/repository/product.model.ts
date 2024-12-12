import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  tableName: "products",
  timestamps: false,
})
export class ProductModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  description: string;

  @Column({ allowNull: false })
<<<<<<< HEAD
<<<<<<< HEAD
=======
  quantity: number;

  @Column({ allowNull: false })
>>>>>>> 4fada72 (feat: add back old data)
=======
  quantity: number;

  @Column({ allowNull: false })
>>>>>>> 84f55c57fd4281882faca8cd25a5c391224c1a12
  salesPrice: number;
}
