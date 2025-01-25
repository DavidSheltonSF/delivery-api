import { createUser, getUserByEmail, deleteAllUsers } from './users'
import mongoConnection from './mongoConnection';
import mongoose from 'mongoose';
import { random } from '../helpers';

const users = [
  {
    username: 'Carlos Miranda',
    email: 'carlos@bugmail.com',
    cpf: '11111111111',
    phone: '88888888888',
    role: 'costumer',
    address: {
        street: 'Rua Teste S', 
        city: 'Belford Roxo', 
        state: 'RJ', 
        zipCode: '555858848548'
    },
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
  },
  {
    username: 'Jeronimo Miranda',
    email: 'jeronimo@bugmail.com',
    cpf: '5757757',
    phone: '75757575',
    role: 'restaurant owner',
    address: {
        street: 'Rua Guará S', 
        city: 'Belford Roxo', 
        state: 'RJ', 
        zipCode: '57575757'
    },
    bankInfo: {
      bankName: 'Itaú Unibanco', 
      accountNumber: '5757', 
      agencyNumber: '227', 
      accountType: 'typeTEst',
      pixKey: 'jero@bugmail.com'
    },
    authentication: {
        password: 'jeronimo123',
        salt: random()
    },
  }
]

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
      address: {
          street: 'Rua Teste S', 
          city: 'Belford Roxo', 
          state: 'RJ', 
          zipCode: '555858848548'
      },
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

    const gotUser = await getUserByEmail(users[1].email);

    expect(gotUser.email).toBe(users[1].email)
  });

});