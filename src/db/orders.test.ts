import mongoose from 'mongoose';
import mongoConnection from './mongoConnection';
import { 
  createOrder, 
  getOrderById, 
  deleteAllOrders,
  getOrders,
  deleteOrderById,
  updateOrderById
} from './orders'
import { arraysOfObjAreEqual } from '../helpers';


const orders = [
  {
    costumerId: '4545asfdsafsdsd',
    products: [
      {
        productName: 'pizza quatro queijos',
        price: 20.50,
        quantity: 2
      },
      {
        productName: 'pizza de banana',
        price: 35.50,
        quantity: 1
      },
    ],
    totalPrice: 76.50,
    status: 'pending'
  },
  {
    costumerId: 'f4sd484848gdesggg',
    products: [
      {
        productName: 'pizza quatro queijos',
        price: 20.50,
        quantity: 3
      },
      {
        productName: 'pizza de chocolate',
        price: 40.50,
        quantity: 2
      },
    ],
    totalPrice: 142.50,
    status: 'on the way'
  }
];


describe('mongoTest', () => {

 beforeAll(async () => {
     mongoConnection();
     await deleteAllOrders();
   }, 20000);
   afterEach(async () => {
     await deleteAllOrders();
   }, 20000)
   afterAll(async () => {
     await deleteAllOrders();
     mongoose.disconnect();
   }, 20000);
  

 test('Create new order', async () => {

  
    const createdOrder = await createOrder(orders[0]);
    
    const gotOrder = await getOrderById(createdOrder._id.toString());

    expect(gotOrder.totalPrice).toBe(orders[0].totalPrice);
    expect(arraysOfObjAreEqual(gotOrder.products, orders[0].products)).toBeTruthy();
    expect(gotOrder.status).toBe(orders[0].status);

  }, 50000);

  test('Get all orders', async () => {

    await createOrder(orders[0]);
    await createOrder(orders[1]);

    const allOrdersGot = await getOrders().lean().exec();

    expect(allOrdersGot[0].totalPrice).toBe(orders[0].totalPrice);
    expect(arraysOfObjAreEqual(allOrdersGot[0].products, orders[0].products))
      .toBeTruthy();
    expect(allOrdersGot[0].status).toBe(orders[0].status);

    expect(allOrdersGot[1].totalPrice).toBe(orders[1].totalPrice);
    expect(arraysOfObjAreEqual(allOrdersGot[1].products, orders[1].products))
      .toBeTruthy();
    expect(allOrdersGot[1].status).toBe(orders[1].status);
   
  });

  
  test('Delete orders', async () => {
  
      const createdOrder = await createOrder(orders[1]);
  
      await deleteOrderById(createdOrder._id.toString());

      const gotOrder = await getOrderById(createdOrder._id.toString());
  
      expect(gotOrder).toBeFalsy()
  
    }, 10000);
  
  test('Update orders by Id', async () => {

      const orderCreated = await createOrder(orders[1]);
  
      const newData = {
        costumerId: 'f4sd484848gdesggg-updated',
        products: [
          {
            productName: 'pizza quatro queijos-updated',
            price: 100,
            quantity: 10
          },
          {
            productName: 'pizza de chocolate-updated',
            price: 100,
            quantity: 10
          },
        ],
        totalPrice: 0,
        status: 'on the way-updated'
      }
  
      await updateOrderById(orderCreated._id.toString(), newData);

      const updatedOrder = await getOrderById(orderCreated._id.toString());
  
      expect(updatedOrder.totalPrice).toBe(newData.totalPrice);
      expect(updatedOrder.status).toBe(newData.status);
      expect(arraysOfObjAreEqual(updatedOrder.products, newData.products))
        .toBeTruthy();
    });
  
});