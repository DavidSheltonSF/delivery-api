import { faker } from '@faker-js/faker';

export const generateRandomUser = () => {
  return {
    _id: faker.string.uuid(),
    username: faker.internet.username,
    email: faker.internet.email,
    cpf: faker.string.numeric(11),
    phone: faker.phone,
    role: faker.helpers.arrayElements(['admin', 'costumer', 'restaurant owner', 'driver']),
    address: {
      street: faker.location.street(),
      city: faker.location.city(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode('########')
    },
    bankInfo: {
      bankName: faker.helpers.arrayElements(['Itaú', 'Santander', 'Banco do Brasil Caixa', 'Inter']),
      agencyNumber: faker.string.numeric(4),
      accountType: faker.helpers.arrayElements(['Conta Corrente']),
      pixKay: faker.helpers.arrayElements(['2155988484', 'pix@bugmail.com']),
    }
  }
}
