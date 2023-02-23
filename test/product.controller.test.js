const Product = require('../src/models/product.model');
const productController = require('../src/controllers/product.controller');

describe('productController', () => {
  describe('findAll', () => {
    it('should call Product.findAll annpd return the result', () => {
      // Arrange
      const expectedProducts = [{ name: 'Product 1' }, { name: 'Product 2' }];
      const findAllMock = jest.spyOn(Product, 'findAll').mockImplementation((callback) => {
        callback(null, expectedProducts);
      });
      const res = { send: jest.fn() };

      // Act
      productController.findAll({}, res);

      // Assert
      expect(findAllMock).toHaveBeenCalled();
      expect(res.send).toHaveBeenCalledWith(expectedProducts);

      // Clean up
      findAllMock.mockRestore();
    });

    it('should call res.send with an error message if Product.findAll returns an error', () => {
      // Arrange
      const expectedError = new Error('Unexpected error');
      const findAllMock = jest.spyOn(Product, 'findAll').mockImplementation((callback) => {
        callback(expectedError, null);
      });
      const res = { send: jest.fn() };

      // Act
      productController.findAll({}, res);

      // Assert
      expect(findAllMock).toHaveBeenCalled();
      expect(res.send).toHaveBeenCalledWith(expectedError);

      // Clean up
      findAllMock.mockRestore();

      
    });
  });
});

describe('createMultiple', () => {
    it('should create multiple products and return a success message', () => {
      // Arrange
      const req = { body: [{ name: 'Product 1', price: 10 }, { name: 'Product 2', price: 20 }] };
      const createMock = jest.spyOn(Product, 'create').mockImplementation((product, callback) => {
        callback(null, product);
      });
      const res = { json: jest.fn() };
  
      // Act
      productController.createMultiple(req, res);
  
      // Assert
      expect(createMock).toHaveBeenCalledTimes(2);
      expect(res.json).toHaveBeenCalledWith({ error: false, message: 'Products added successfully!' });
  
      // Clean up
      createMock.mockRestore();
    });

  });