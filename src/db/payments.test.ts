import { 
  createPayment, 
  getPaymentById, 
  deleteAllPayments, 
  getPayments,
  deletePaymentById,
  updatePaymentById
} from './payments'
import mongoConnection from './mongoConnection';
import mongoose from 'mongoose';

const payments = [
  {
    orderId: '15fda58f4sd5fasf',
    paymentMethod: 'pix',
    status: 'paid',
  },
  {
    orderId: '494sa4fgdsafsadf',
    paymentMethod: 'credit card',
    status: 'failed',
  },
];


describe('mongoTest', () => {

 beforeAll(async () => {
     await mongoConnection();
     await deleteAllPayments();
   }, 20000);
   afterEach(async () => {
     await deleteAllPayments();
   }, 20000)
   afterAll(async () => {
     await deleteAllPayments();
     mongoose.disconnect();
   }, 20000);
  

 test('Create new payment', async () => {
  
    const paymentCreated = await createPayment(payments[0]);

    const paymentGet = await getPaymentById(paymentCreated._id.toString());

    expect(paymentGet.paymentMethod).toBe(payments[0].paymentMethod);
    expect(paymentGet.status).toBe(payments[0].status);

  }, 50000);

  test('Get all payments', async () => {

    await createPayment(payments[0]);
    await createPayment(payments[1]);

    const allPaymentsGot = await getPayments().lean().exec();

    expect(allPaymentsGot[0].paymentMethod).toBe(payments[0].paymentMethod);
    expect(allPaymentsGot[0].status).toBe(payments[0].status);

    expect(allPaymentsGot[1].paymentMethod).toBe(payments[1].paymentMethod);
    expect(allPaymentsGot[1].status).toBe(payments[1].status);

  });

  test('Delete payments', async () => {
  
      const createdPayment = await createPayment(payments[1]);
  
      const paymentsGot = await getPaymentById(createdPayment._id.toString());
  
      const deletedPayments = await deletePaymentById(paymentsGot._id.toString());
  
      expect(deletedPayments.paymentMethod).toBe(payments[1].paymentMethod);
      expect(deletedPayments.status).toBe(payments[1].status);
      expect(await getPaymentById(createdPayment._id.toString())).toBeFalsy();
  
    }, 10000);

  test('Update payments by Id', async () => {
      const createdPayment = await createPayment(payments[1]);
  
      const newData = {
        orderId: '15fda58f4sd5fasf-updated',
        paymentMethod: 'pix-updated',
        status: 'paid-updated',
      }
  
      await updatePaymentById(createdPayment._id.toString(), newData);

      const updatedPayment = await getPaymentById(createdPayment._id.toString());
      
      expect(updatedPayment.paymentMethod).toBe(newData.paymentMethod);
      expect(updatedPayment.status).toBe(newData.status);
    });
});