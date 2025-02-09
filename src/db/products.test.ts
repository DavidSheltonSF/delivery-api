import { 
  createProduct, 
  getProductById, 
  deleteAllProducts,
  getProducts,
  deleteProductById,
  updateProductById
} from './products'
import mongoConnection from './mongoConnection';
import mongoose from 'mongoose';

const products = [
  {
    name: 'Pizza de Calabresa',
    description: 'Pizza com calabresas...',
    price: 25.50,
    restaurantId: '448484'
  },
  {
    name: 'Pizza Quatro Queijos',
    description: 'Pizza com muito queijo...',
    price: 45.50,
    restaurantId: '448484'
  } 
];


describe('mongoTest', () => {

 beforeAll(async () => {
     await mongoConnection();
     await deleteAllProducts();
   }, 20000);
   afterEach(async () => {
     await deleteAllProducts();
   }, 20000)
   afterAll(async () => {
     await deleteAllProducts();
     mongoose.disconnect();
   }, 20000);
  

 test('Create new product', async () => {

    const product = {
      name: 'Pizza de Calabresa',
      description: 'Pizza com calabresas...',
      price: 25.50,
      restaurantId: '448484'
    } 
  
    const productCreated = await createProduct(product);
    
    const productGet = await getProductById(productCreated._id.toString());

    expect(productGet.name).toBe(product.name);
    expect(productGet.description).toBe(product.description);
    expect(productGet.price).toBe(product.price);
    expect(productGet.restaurantId).toBe(product.restaurantId);

  }, 50000);

  test('Get all products', async () => {

    await createProduct(products[0]);
    await createProduct(products[1]);

    const allProductsGot = await getProducts().lean().exec();

    expect(products[0].name).toBe(allProductsGot[0].name);
    expect(products[0].description).toBe(allProductsGot[0].description);
    expect(products[0].price).toBe(allProductsGot[0].price);
    expect(products[0].restaurantId).toBe(allProductsGot[0].restaurantId);

    expect(products[1].name).toBe(allProductsGot[1].name);
    expect(products[1].description).toBe(allProductsGot[1].description);
    expect(products[0].restaurantId).toBe(allProductsGot[0].restaurantId);
    expect(products[1].price).toBe(allProductsGot[1].price);
  });

  test('Delete products', async () => {
  
      const createdProduct = await createProduct(products[1]);
  
      const productGot = await getProductById(createdProduct._id.toString());
  
      const deletedProducts = await deleteProductById(productGot._id.toString());
  
      expect(deletedProducts.name).toBe(products[1].name);
      expect(deletedProducts.price).toBe(products[1].price);
      expect(await getProductById(productGot._id.toString())).toBeFalsy()
  
    }, 10000);

  test('Update products by Id', async () => {

      const productCreated = await createProduct(products[1]);
  
      const newData = {
        name: 'Updated Pizza',
        description: 'Pizza com cupdates...',
        price: 80.50,
        restaurantId: 'updated001'
      } 
  
      await updateProductById(productCreated._id.toString(), newData);

      const updatedProduct = await getProductById(productCreated._id.toString());
  
      expect(updatedProduct.name).toBe(newData.name);
      expect(updatedProduct.description).toBe(newData.description);
      expect(updatedProduct.price).toBe(newData.price);
      expect(updatedProduct.restaurantId).toBe(newData.restaurantId);
    });
});