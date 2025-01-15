import AddClientUseCase from './add-client.usecase'

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn(),
  }
}

describe('Add Client Use Case unit test', () => {
  it('should add a client', async () => {
    const repository = MockRepository()
    const usecase = new AddClientUseCase(repository)
    const input = {
      name: 'Janie Patton',
      email: 'janie.patton@email.com',
      document: 'ABC123',
      street: 'Helena Fuller',
      number: '54',
      complement: 'AP 123',
      city: 'Belo Horizonte',
      state: 'MG',
      zipCode: '31659-564',
    }
    const result = await usecase.execute(input)
    expect(repository.add).toHaveBeenCalled()
    expect(result.id).toBeDefined()
    expect(result.name).toEqual(input.name)
    expect(result.email).toEqual(input.email)
    expect(result.document).toEqual(input.document)
    expect(result.street).toEqual(input.street)
    expect(result.number).toEqual(input.number)
    expect(result.complement).toEqual(input.complement)
    expect(result.city).toEqual(input.city)
    expect(result.state).toEqual(input.state)
    expect(result.zipCode).toEqual(input.zipCode)
  })
})
