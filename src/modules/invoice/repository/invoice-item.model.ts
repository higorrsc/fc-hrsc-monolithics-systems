import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  tableName: "invoice_items",
  timestamps: false,
})
export class InvoiceItemModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @Column({ allowNull: false })
  invoiceId: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  price: number;
}
