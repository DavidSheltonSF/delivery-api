import mongoose from 'mongoose';

const RestaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cnpj: { type: String, required: true },
  phone: { type: String },
  category: {type: [String], required: true}, // [Japanese, sushibar] or [Brasilian, backery]
  isOpen: { type: Boolean, default: true },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  imageUrl: { type: String, default: 'none' },
  ownerId: { type: String, required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
  },
}, {timestamps: true}); 

const RestaurantModel = mongoose.model('RestaurantsTest', RestaurantSchema);

export const getRestaurants = () => RestaurantModel.find();
export const getRestaurantById = (id: string) => RestaurantModel.findById(id);
export const getRestaurantByOwnerId = (ownerId: string) => RestaurantModel
  .findOne({ ownerId });
export const getRestaurantByCategory = (category: string) => RestaurantModel
  .findOne({ category });
export const createRestaurant = (values: Record<string, any>) => new RestaurantModel(values)
  .save().then((restaurant) => restaurant.toObject());
export const deleteRestaurantById = (id: string) => RestaurantModel
  .findByIdAndDelete(id);
export const updateRestaurantById = (id: string, values: Record<string, any>) => 
  RestaurantModel.findByIdAndUpdate(id, values);
export const deleteAllRestaurants = () => RestaurantModel.deleteMany();