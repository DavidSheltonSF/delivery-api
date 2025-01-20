import { createUser, getUserByEmail } from './users'
import mongoConnection from './mongoConnection';
import mongoose from 'mongoose';

describe('mongoTest', () => {

  beforeAll(() => {
    mongoConnection()
  })
  //afterAll(() => mongoose.disconnect())

  test('Create new user', async () => {
  
    const user = await createUser({
      username: 'AAAAA',
      email: 'test@bugmail.com',
      cpf: '11111111111',
      phone: '88888888888',
      addresses: [
        {
          street: 'Rua Teste S', 
          city: 'Belford Roxo', 
          state: 'RJ', 
          zipCode: '555858848548'
        }
      ],
      bankInfo: {
        bankName: 'Itaú Unibanco', 
        accountNumber: '14314', 
        agencyNumber: '5445', 
        accountType: 'typeTEst',
        pixKey: 'test@bugmail.com'
      },
      authentication: {
          password: 'dsfsdafsfsafsdf',
          salt: 55
      },
    })
    
    console.log('created')
    const userGet = await getUserByEmail('test@bugmail.com');
    await mongoose.disconnect();
    console.log('dsconnected');
  
    expect(userGet.email).toBe('test@bugmail.com');
  }, 50000);
})