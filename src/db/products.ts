import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  restaurantId: { type: String, required: true },
  imageURL: { type: String, default: 'none' }
});

const ProductModel = mongoose.model('Products', ProductSchema);

export const getProducts = () => ProductModel.find();
export const getProductById = (id:  String) => ProductModel.findById(id);
export const createProduct = (values: Record <string, any>) => new ProductModel(values)
  .save().then((product) => product.toObject());
export const updateProductById = (id: String, values: Record<string, any>) => ProductModel
  .findByIdAndUpdate(id, values);
export const deleteProductById = (id: String) => ProductModel.findByIdAndDelete(id);
export const deleteAllProducts = () => ProductModel.deleteMany();