import { DataType, Sequelize } from 'sequelize-typescript'
import { MigrationFn } from 'umzug'

export const up: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
  await createTableClients(sequelize)
  await createTableProducts(sequelize)
  await createTableInvoices(sequelize)
  await createTableInvoiceItems(sequelize)
  await createTableTransactions(sequelize)
  await createTableOrders(sequelize)
  await createTableOrderItems(sequelize)
}

export const down: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable('order_items')
  await sequelize.getQueryInterface().dropTable('orders')
  await sequelize.getQueryInterface().dropTable('transactions')
  await sequelize.getQueryInterface().dropTable('invoice_items')
  await sequelize.getQueryInterface().dropTable('invoices')
  await sequelize.getQueryInterface().dropTable('products')
  await sequelize.getQueryInterface().dropTable('clients')
}

async function createTableClients(sequelize: Sequelize) {
  await sequelize.getQueryInterface().createTable('clients', {
    id: {
      type: DataType.STRING(255),
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataType.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataType.STRING(255),
      allowNull: false,
    },
    document: {
      type: DataType.STRING(255),
      allowNull: false,
    },
    street: {
      type: DataType.STRING(255),
      allowNull: false,
    },
    number: {
      type: DataType.STRING(255),
      allowNull: false,
    },
    complement: {
      type: DataType.STRING(255),
      allowNull: false,
    },
    city: {
      type: DataType.STRING(255),
      allowNull: false,
    },
    state: {
      type: DataType.STRING(255),
      allowNull: false,
    },
    zipCode: {
      type: DataType.STRING(255),
      allowNull: false,
    },
    createdAt: {
      type: DataType.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataType.DATE,
      allowNull: false,
    },
  })
}

async function createTableProducts(sequelize: Sequelize) {
  await sequelize.getQueryInterface().createTable('products', {
    id: {
      type: DataType.STRING(255),
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataType.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataType.STRING(255),
      allowNull: false,
    },
    purchasePrice: {
      type: DataType.NUMBER,
      allowNull: true,
    },
    salesPrice: {
      type: DataType.NUMBER,
      allowNull: true,
    },
    stock: {
      type: DataType.NUMBER,
      allowNull: true,
    },
    createdAt: {
      type: DataType.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataType.DATE,
      allowNull: false,
    },
  })
}

async function createTableInvoices(sequelize: Sequelize) {
  await sequelize.getQueryInterface().createTable('invoices', {
    id: {
      type: DataType.STRING(255),
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataType.STRING(255),
      allowNull: false,
    },
    document: {
      type: DataType.STRING(255),
      allowNull: false,
    },
    street: {
      type: DataType.STRING(255),
      allowNull: false,
    },
    number: {
      type: DataType.STRING(255),
      allowNull: false,
    },
    complement: {
      type: DataType.STRING(255),
      allowNull: false,
    },
    city: {
      type: DataType.STRING(255),
      allowNull: false,
    },
    state: {
      type: DataType.STRING(255),
      allowNull: false,
    },
    zipCode: {
      type: DataType.STRING(255),
      allowNull: false,
    },
    total: {
      type: DataType.NUMBER,
      allowNull: false,
    },
    createdAt: {
      type: DataType.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataType.DATE,
      allowNull: false,
    },
  })
}

async function createTableInvoiceItems(sequelize: Sequelize) {
  await sequelize.getQueryInterface().createTable('invoice_items', {
    id: {
      type: DataType.STRING(255),
      primaryKey: true,
      allowNull: false,
    },
    invoiceId: {
      type: DataType.STRING(255),
      allowNull: false,
    },
    name: {
      type: DataType.STRING(255),
      allowNull: false,
    },
    price: {
      type: DataType.NUMBER,
      allowNull: false,
    },
    quantity: {
      type: DataType.NUMBER,
      allowNull: false,
    },
    total: {
      type: DataType.NUMBER,
      allowNull: false,
    },
    createdAt: {
      type: DataType.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataType.DATE,
      allowNull: false,
    },
  })
}

async function createTableTransactions(sequelize: Sequelize) {
  await sequelize.getQueryInterface().createTable('transactions', {
    id: {
      type: DataType.STRING(255),
      primaryKey: true,
      allowNull: false,
    },
    amount: {
      type: DataType.NUMBER,
      allowNull: false,
    },
    orderId: {
      type: DataType.STRING(255),
      allowNull: false,
    },
    status: {
      type: DataType.STRING(255),
      allowNull: false,
    },
    createdAt: {
      type: DataType.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataType.DATE,
      allowNull: false,
    },
  })
}

async function createTableOrders(sequelize: Sequelize) {
  await sequelize.getQueryInterface().createTable('orders', {
    id: {
      type: DataType.STRING(255),
      primaryKey: true,
      allowNull: false,
    },
    clientId: {
      type: DataType.STRING(255),
      allowNull: false,
    },
    total: {
      type: DataType.NUMBER,
      allowNull: false,
    },
    status: {
      type: DataType.STRING(255),
      allowNull: false,
    },
    createdAt: {
      type: DataType.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataType.DATE,
      allowNull: false,
    },
  })
}

async function createTableOrderItems(sequelize: Sequelize) {
  await sequelize.getQueryInterface().createTable('order_items', {
    id: {
      type: DataType.STRING(255),
      primaryKey: true,
      allowNull: false,
    },
    orderId: {
      type: DataType.STRING(255),
      allowNull: false,
    },
    productId: {
      type: DataType.STRING(255),
      allowNull: false,
    },
    quantity: {
      type: DataType.NUMBER,
      allowNull: false,
    },
    price: {
      type: DataType.NUMBER,
      allowNull: false,
    },
    total: {
      type: DataType.NUMBER,
      allowNull: false,
    },
    createdAt: {
      type: DataType.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataType.DATE,
      allowNull: false,
    },
  })
}
