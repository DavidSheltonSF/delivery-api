import { 
  createRestaurant, 
  getRestaurantById, 
  deleteAllRestaurants, 
  getRestaurantByOwnerId,
  getRestaurants,
  deleteRestaurantById,
  updateRestaurantById
} from './restaurants'
import mongoConnection from './mongoConnection';
import mongoose from 'mongoose';

const restaurants = [
  {
    name: 'Pizzaria Gregorio e Filho',
    cnpj: '11111111111',
    phone: '88888888888',
    category: ['Italian', 'pizaria'],
    ownerId: '11515151',
    address: {
      street: 'Rua Alfonso', 
      city: 'Belford Roxo', 
      state: 'RJ', 
      zipCode: '454841548485454'
    },
  },
  {
    name: 'Shifu Comida Chinesa',
    cnpj: '11111111111',
    phone: '88888888888',
    category: ['Chinese', 'sushi'],
    ownerId: '8888211',
    address: {
        street: 'Rua Trevo', 
        city: 'São João de Merití', 
        state: 'RJ', 
        zipCode: '25552'
    },
  }
];


describe('mongoTest', () => {

 beforeAll(async () => {
     mongoConnection();
     await deleteAllRestaurants();
   }, 20000);
   afterEach(async () => {
     await deleteAllRestaurants();
   }, 20000)
   afterAll(async () => {
     await deleteAllRestaurants();
     mongoose.disconnect();
   }, 20000);
  

 test('Create new restaurant', async () => {

    const restaurant = {
      name: 'Pizzaria Gregorio e Filho',
      cnpj: '11111111111',
      phone: '88888888888',
      category: ['Italian', 'pizaria'],
      ownerId: '11515151',
      address: {
          street: 'Rua Alfonso', 
          city: 'Belford Roxo', 
          state: 'RJ', 
          zipCode: '454841548485454'
      }   
    } 
  
    const restaurantCreated = await createRestaurant(restaurant);
    
    const restaurantGet = await getRestaurantByOwnerId(restaurantCreated.ownerId);

    expect(restaurantGet.name).toBe(restaurant.name);
    expect(restaurantGet.cnpj).toBe(restaurant.cnpj);
    expect(restaurantGet.phone).toBe(restaurant.phone);
    expect(JSON.stringify(restaurantGet.category))
      .toBe(JSON.stringify(restaurant.category));
    expect(restaurantGet.ownerId).toBe(restaurant.ownerId);
    expect(JSON.stringify(restaurantGet.address))
      .toBe(JSON.stringify(restaurant.address));

  }, 50000);

  test('Get all restaurants', async () => {

    await createRestaurant(restaurants[0]);
    await createRestaurant(restaurants[1]);

    const allRestaurantsGot = await getRestaurants().lean().exec();

    expect(restaurants[0].name).toBe(allRestaurantsGot[0].name);
    expect(restaurants[0].cnpj).toBe(allRestaurantsGot[0].cnpj);
    expect(restaurants[0].ownerId).toBe(allRestaurantsGot[0].ownerId);

    expect(restaurants[1].name).toBe(allRestaurantsGot[1].name);
    expect(restaurants[1].cnpj).toBe(allRestaurantsGot[1].cnpj);
    expect(restaurants[1].ownerId).toBe(allRestaurantsGot[1].ownerId);
  });

  test('Delete restaurants', async () => {
  
      await createRestaurant(restaurants[1]);
  
      const restaurantsGot = await getRestaurantByOwnerId(restaurants[1].ownerId);
  
      const deletedRestaurants = await deleteRestaurantById(restaurantsGot._id.toString());
  
      expect(deletedRestaurants.ownerId).toBe(restaurants[1].ownerId);
      expect(await getRestaurantByOwnerId(restaurants[1].ownerId)).toBeFalsy()
  
    }, 10000);

  test('Update restaurants by Id', async () => {
      await createRestaurant(restaurants[1]);
  
      const newData = {
        name: 'Updated Comida Chinesa',
        cnpj: '11111111111',
        phone: '88888888888',
        category: ['Japanese', 'lamem'],
        ownerId: '8888211',
        address: {
            street: 'Rua Updated', 
            city: 'São João de Merití', 
            state: 'RJ', 
            zipCode: '25552'
        }
      }
  
      const restaurantsGot = await getRestaurantByOwnerId(restaurants[1].ownerId);
  
      const updatedRestaurants = await updateRestaurantById(restaurantsGot._id.toString(), newData);
  
      expect(updatedRestaurants.ownerId).toBe(newData.ownerId);
    });
});