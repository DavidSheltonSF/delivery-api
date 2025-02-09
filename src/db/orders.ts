import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  costumerId: { type: String, required: true },
  restaurantId: { type: String, required: true },
  products: {
    type: [
      {
        productName: String, 
        price: Number, 
        quantity: Number
      },
    ],
    required: true
  }, 
  totalPrice: { type: Number, required: true },
  status: {
    type: String, 
    required: true,
    enum: ['pending', 'preparing', 'on the way', 'delivered']
  },
}, {timestamps: true})

const OrderModel = mongoose.model("Orders", OrderSchema);

export const getOrders = () => OrderModel.find();
export const getOrderById = (id: String) => OrderModel.findById(id);
export const createOrder = (values: Record<string, any>) => new OrderModel(values)
  .save().then((order) => order.toObject());
export const deleteOrderById = (id: string) => OrderModel.findByIdAndDelete(id);
export const updateOrderById = (id: String, values: Record<string, any>) => OrderModel.
 findByIdAndUpdate(id, values);
export const deleteAllOrders = () => OrderModel.deleteMany()
