import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  paymentMethod: {
    type: String, 
    required: true,
    enum: ['credit card', 'cash', 'debt card', 'pix']
  },
  status: { 
    type: String,
    required: true,
    enum: ['paid', 'pending', 'failed']
   },
}, {timestamps: true}); 

const PaymentModel = mongoose.model('PaymentsTest', PaymentSchema);

export const getPayments = () => PaymentModel.find();
export const getPaymentById = (id: string) => PaymentModel.findById(id);
export const createPayment = (values: Record<string, any>) => new PaymentModel(values)
  .save().then((payment) => payment.toObject());
export const deletePaymentById = (id: string) => PaymentModel
  .findByIdAndDelete(id);
export const updatePaymentById = (id: string, values: Record<string, any>) => 
  PaymentModel.findByIdAndUpdate(id, values);
export const deleteAllPayments = () => PaymentModel.deleteMany();