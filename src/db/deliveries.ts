import mongoose from 'mongoose';

const Deliverieschema = new mongoose.Schema({
  orderId: { type: String, required: true },
  driverId: { type: String, required: true },
  
  status: { 
    type: String,
    required: true,
    enum: ['assigned', 'on the way', 'completed']
   },
   timeEstimate: { type: Number, required: true }
}, {timestamps: true}); 

const DeliveryModel = mongoose.model('DeliveriesTest', Deliverieschema);

export const getDeliveries = () => DeliveryModel.find();
export const getDeliveryById = (id: string) => DeliveryModel.findById(id);
export const getDeliveryByDriverId = (driverId: string) => DeliveryModel.find({ driverId });
export const createDelivery = (values: Record<string, any>) => new DeliveryModel(values)
  .save().then((delivery) => delivery.toObject());
export const deleteDeliveryById = (id: string) => DeliveryModel
  .findByIdAndDelete(id);
export const updateDeliveryById = (id: string, values: Record<string, any>) => 
  DeliveryModel.findByIdAndUpdate(id, values);
export const deleteAllDeliveries = () => DeliveryModel.deleteMany();