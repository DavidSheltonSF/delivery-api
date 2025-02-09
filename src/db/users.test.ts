import { createUser, getUserById, getUserByEmail, deleteUserById, deleteAllUsers, updateUserById } from './users'
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

  beforeAll(async () => {
    await mongoConnection();
    await deleteAllUsers();
  });
  afterEach(async () => {
    await deleteAllUsers();
  })
  afterAll(async () => {
    await deleteAllUsers();
    mongoose.disconnect();
  });

  test('Create new user', async () => {

    const userEmail = 'carlos@bugmail.com';
  
    const user = await createUser(users[0]);
    
    const userGet = await getUserByEmail(userEmail);

    expect(userGet.email).toBe(userEmail);
  }, 50000);

  test('Get user by email', async () => {

    await createUser(users[1]);

    const gotUser = await getUserByEmail(users[1].email);

    expect(gotUser.email).toBe(users[1].email)
  });

  test('Delete user', async () => {

    await createUser(users[1]);

    const userGot = await getUserByEmail(users[1].email);

    const deletedUser = await deleteUserById(userGot._id.toString());

    expect(deletedUser.email).toBe(users[1].email);
    expect(await getUserByEmail(users[1].email)).toBeFalsy()

  }, 10000);

  test('Update user by Id', async () => {
    const userCreaded = await createUser(users[1]);

    const newData = {
      username: 'UpdatedName Miranda',
      email: 'updated@bugmail.com',
      cpf: '5757757-updated',
      phone: '75757575-updated',
      role: 'restaurant owner-updated',
      address: {
          street: 'Rua Guará -updated', 
          city: 'Belford Roxo', 
          state: 'RJ', 
          zipCode: '57575757'
      },
      bankInfo: {
        bankName: 'Itaú Unibanco-updated', 
        accountNumber: '5757', 
        agencyNumber: '227', 
        accountType: 'typeTEst',
        pixKey: 'jero@bugmail.com-updated'
      },
      authentication: {
          password: 'jeronimo123-updated',
          salt: random()
      },
    }

    await updateUserById(userCreaded._id.toString(), newData);

    const updatedUser = await getUserById(userCreaded._id.toString());

    expect(updatedUser.username).toBe(newData.username);
    expect(updatedUser.email).toBe(newData.email);
    expect(updatedUser.cpf).toBe(newData.cpf);
  });

});