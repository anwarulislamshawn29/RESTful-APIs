import { Test, TestingModule } from '@nestjs/testing';
import { CreateProductDto } from './dto/create-product.dto';
import { ResponseCreateProductDto } from './dto/response-create-product.dto';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

const mockProductService = () => ({
  create: jest.fn(),
  createInventory: jest.fn(),
  findAll: jest.fn(),
  findAProduct: jest.fn(),
  update: jest.fn(),
  updateInventory: jest.fn(),
  remove: jest.fn()
})
describe('ProductController', () => {
  let productController: ProductController;
  let productService: ProductService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [{
        provide: ProductService,
        useFactory: mockProductService
      }],
    }).compile();

    productController = module.get<ProductController>(ProductController);
    productService = module.get<ProductService>(ProductService);
  });

  describe('should be defined', () => {
    it('should be defined the productController', () => {
      expect(productController).toBeDefined();
    });
    it('should be defined the productService', () => {
      expect(productService).toBeDefined();
    });
  })

  describe('should call productController.create with productService.create', () => {
    it('should call productController.create and productService.create once', async () => {
      jest.spyOn(productService, 'create').mockResolvedValue(new ResponseCreateProductDto)
      await productController.create(new CreateProductDto)
      expect(productService.create).toHaveBeenCalledTimes(1);
    });
    it('should call productController.create and productService.create and return proper result', async () => {
      jest.spyOn(productService, 'create').mockResolvedValue(new ResponseCreateProductDto)
      const result = await productController.create(new CreateProductDto)
      expect(result).toEqual(new ResponseCreateProductDto);
    });
  })

});
