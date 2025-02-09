import { 
  createDelivery, 
  getDeliveryById,
  getDeliveryByDriverId,
  deleteAllDeliveries, 
  getDeliveries,
  deleteDeliveryById,
  updateDeliveryById
} from './deliveries'
import mongoConnection from './mongoConnection';
import mongoose from 'mongoose';

const deliveries = [
  {
    orderId: 'f5dsa4ffffh',
    driverId: '545dgfafgsdg',
    status: 'assigned',
    timeEstimate: 30
  },
  {
    orderId: '55ggedga',
    driverId: '545dgfafgsdg',
    status: 'on the way',
    timeEstimate: 25
  },
];


describe('mongoTest', () => {

 beforeAll(async () => {
     await mongoConnection();
     await deleteAllDeliveries();
   }, 20000);
   afterEach(async () => {
     await deleteAllDeliveries();
   }, 20000)
   afterAll(async () => {
     await deleteAllDeliveries();
     mongoose.disconnect();
   }, 20000);
  

 test('Create new delivery', async () => {
  
    const deliveryCreated = await createDelivery(deliveries[0]);

    const deliveryGet = await getDeliveryById(deliveryCreated._id.toString());

    expect(deliveryGet.orderId).toBe(deliveries[0].orderId);
    expect(deliveryGet.driverId).toBe(deliveries[0].driverId);
    expect(deliveryGet.status).toBe(deliveries[0].status);

  }, 50000);

  test('Get all deliveries', async () => {

    await createDelivery(deliveries[0]);
    await createDelivery(deliveries[1]);

    const allDeliveriesGot = await getDeliveries().lean().exec();

    expect(allDeliveriesGot[0].orderId).toBe(deliveries[0].orderId);
    expect(allDeliveriesGot[0].driverId).toBe(deliveries[0].driverId);
    expect(allDeliveriesGot[0].status).toBe(deliveries[0].status);

    expect(allDeliveriesGot[1].orderId).toBe(deliveries[1].orderId);
    expect(allDeliveriesGot[1].driverId).toBe(deliveries[1].driverId);
    expect(allDeliveriesGot[1].status).toBe(deliveries[1].status);

  });

  test('Delete deliveries', async () => {
  
      const createdDelivery = await createDelivery(deliveries[1]);
  
      const deliveriesGot = await getDeliveryById(createdDelivery._id.toString());
  
      const deletedDeliveries = await deleteDeliveryById(deliveriesGot._id.toString());
  
      expect(deletedDeliveries.orderId).toBe(deliveries[1].orderId);
      expect(deletedDeliveries.driverId).toBe(deliveries[1].driverId);
      expect(deletedDeliveries.status).toBe(deliveries[1].status);
      expect(await getDeliveryById(createdDelivery._id.toString())).toBeFalsy();
  
    }, 10000);

  test('Update deliveries by Id', async () => {
      const createdDelivery = await createDelivery(deliveries[1]);
  
      const newData = {
        orderId: 'f5dsa4ffffh-updated',
        driverId: '545dgfafgsdg-updated',
        status: 'assigned-updated',
        timeEstimate: 60
      }
  
      await updateDeliveryById(createdDelivery._id.toString(), newData);

      const updatedDelivery = await getDeliveryById(createdDelivery._id.toString());
      
      expect(updatedDelivery.orderId).toBe(newData.orderId);
      expect(updatedDelivery.driverId).toBe(newData.driverId);
      expect(updatedDelivery.status).toBe(newData.status);
    });
});