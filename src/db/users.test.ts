import { createUser, getUserByEmail, deleteAllUsers } from './users'
import mongoConnection from './mongoConnection';
import mongoose from 'mongoose';
import { random } from '../helpers';

describe('mongoTest', () => {

  beforeAll(() => {
    mongoConnection();;
  })
  afterAll(async () => {
    mongoose.disconnect();
  });
  afterEach(async () => {
    await deleteAllUsers();
  })

  test('Create new user', async () => {

    const userEmail = 'carlos@bugmail.com';
  
    const user = await createUser({
      username: 'Carlos Miranda',
      email: userEmail,
      cpf: '11111111111',
      phone: '88888888888',
      role: 'costumer',
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
          password: 'carlos123',
          salt: random()
      },
    })
    
    const userGet = await getUserByEmail(userEmail);

    expect(userGet.email).toBe(userEmail);
  }, 50000);

  test('Get user by email', async () => {
    const userData = {
      username: 'Carlos Miranda',
      email: 'carlos@bugmail.com',
      cpf: '11111111111',
      phone: '88888888888',
      role: 'costumer',
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
          password: 'carlos123',
          salt: random()
      },
    }

    const createdUser = await createUser(userData);

    const gotUser = await getUserByEmail(userData.email);

    expect(createdUser.email).toBe(gotUser.email)
  });

});