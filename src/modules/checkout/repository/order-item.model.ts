import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  tableName: "order_items",
  timestamps: false,
})
export class OrderItemModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @Column({ allowNull: false })
  orderId: string;

  @Column({ allowNull: false })
  productId: string;

  @Column({ allowNull: false })
  quantity: number;

  @Column({ allowNull: false })
  price: number;

  @Column({ allowNull: false })
  createdAt: Date;

  @Column({ allowNull: false })
  updatedAt: Date;
}
