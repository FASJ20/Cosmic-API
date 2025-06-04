import { Product } from "../../src/models/Product.model.js";
import { GetOneProduct } from "../../src/controllers/product.controller";

describe('get products', () => {
  let productId;

  beforeAll(async () => {
    const product = await Product.create({
      name: 'Test Product',
      price: 9.99,
      description: 'Test description',
      category: "Test"
      // include other required fields
    });
    productId = product._id.toString();
  });

  it('should get product by id', async () => {
    const mockRequest = {
      params: { id: productId }
    };

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await GetOneProduct(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalled();
  });
});
