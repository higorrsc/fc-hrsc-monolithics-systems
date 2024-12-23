import { Sequelize } from 'sequelize-typescript'
import Id from '../../@shared/domain/value-object/id.value-object'
import Client from '../domain/client.entity'
import { ClientModel } from './client.model'
import ClientRepository from './client.repository'

describe('ClientRepository test', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })

    sequelize.addModels([ClientModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create a client', async () => {
    const client = new Client({
      id: new Id('1'),
      name: 'Janie Patton',
      email: 'janie.patton@email.com',
      document: 'ABC123',
      street: 'Helena Fuller',
      number: '54',
      complement: 'AP 123',
      city: 'Belo Horizonte',
      state: 'MG',
      zipCode: '31659-564',
    })
    const repository = new ClientRepository()
    await repository.add(client)
    const clientDb = await ClientModel.findOne({ where: { id: client.id.id } })
    expect(clientDb).toBeDefined()
    expect(clientDb.id).toEqual(client.id.id)
    expect(clientDb.name).toEqual(client.name)
    expect(clientDb.email).toEqual(client.email)
    expect(clientDb.document).toEqual(client.document)
    expect(clientDb.street).toEqual(client.street)
    expect(clientDb.number).toEqual(client.number)
    expect(clientDb.complement).toEqual(client.complement)
    expect(clientDb.city).toEqual(client.city)
    expect(clientDb.state).toEqual(client.state)
    expect(clientDb.zipCode).toEqual(client.zipCode)
    expect(clientDb.createdAt).toEqual(client.createdAt)
    expect(clientDb.updatedAt).toEqual(client.updatedAt)
  })

  it('should find a client', async () => {
    const client = await ClientModel.create({
      id: '1',
      name: 'Client 1',
      email: 'email@email.com',
      document: 'ABC123',
      street: 'Helena Fuller',
      number: '54',
      complement: 'AP 123',
      city: 'Belo Horizonte',
      state: 'MG',
      zipCode: '31659-564',
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    const repository = new ClientRepository()
    const result = await repository.find(client.id)
    expect(client.id).toEqual(result.id.id)
    expect(client.name).toEqual(result.name)
    expect(client.email).toEqual(result.email)
    expect(client.document).toEqual(result.document)
    expect(client.street).toEqual(result.street)
    expect(client.number).toEqual(result.number)
    expect(client.complement).toEqual(result.complement)
    expect(client.city).toEqual(result.city)
    expect(client.state).toEqual(result.state)
    expect(client.zipCode).toEqual(result.zipCode)
    expect(client.createdAt).toEqual(result.createdAt)
    expect(client.updatedAt).toEqual(result.updatedAt)
  })
})
