import { Test, TestingModule } from '@nestjs/testing';
import { ListParametersDto } from '../shared/dto/list-parameters.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { ResponseAProductDto } from './dto/response-a-product.dto';
import { ResponseCreateProductDto } from './dto/response-create-product.dto';
import { ResponseProductsDto } from './dto/response-products.dto';
import { UpdateProductDto } from './dto/update-product.dto';
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

    describe('should call productController.findAll with productService.findAll', () => {
      it('should call productController.findAll and productService.findAll once', async () => {
        jest.spyOn(productService, 'findAll').mockResolvedValue(new ResponseProductsDto)
        await productController.findAll(new ListParametersDto)
        expect(productService.findAll).toHaveBeenCalledTimes(1);
      });
      it('should call productController.findAll and productService.findAll and return proper result', async () => {
        jest.spyOn(productService, 'findAll').mockResolvedValue(new ResponseProductsDto)
        const result = await productController.findAll(new ListParametersDto)
        expect(result).toEqual(new ResponseProductsDto);
      });
    })

    describe('should call productController.findOne with productService.findAProduct', () => {
      it('should call productController.findOne and productService.findAProduct once', async () => {
        jest.spyOn(productService, 'findAProduct').mockResolvedValue(new ResponseAProductDto)
        await productController.findOne('3fa85f64-5717-4562-b3fc-2c963f66afa6')
        expect(productService.findAProduct).toHaveBeenCalledTimes(1);
      });
      it('should call productController.findOne and productService.findAProduct and return proper result', async () => {
        jest.spyOn(productService, 'findAProduct').mockResolvedValue(new ResponseAProductDto)
        const result = await productController.findOne('3fa85f64-5717-4562-b3fc-2c963f66afa6')
        expect(result).toEqual(new ResponseAProductDto);
      });
    })

    describe('should call productController.update with productService.update', () => {
      it('should call productController.update and productService.update once', async () => {
        jest.spyOn(productService, 'update').mockResolvedValue(new ResponseAProductDto)
        await productController.update('3fa85f64-5717-4562-b3fc-2c963f66afa6', new UpdateProductDto)
        expect(productService.update).toHaveBeenCalledTimes(1);
      });
      it('should call productController.update and productService.update and return proper result', async () => {
        jest.spyOn(productService, 'update').mockResolvedValue(new ResponseAProductDto)
        const result = await productController.update('3fa85f64-5717-4562-b3fc-2c963f66afa6', new UpdateProductDto)
        expect(result).toEqual(new ResponseAProductDto);
      });
    })

    describe('should call productController.remove with productService.remove', () => {
      it('should call productController.remove and productService.remove once', async () => {
        jest.spyOn(productService, 'remove').mockResolvedValue('')
        await productController.remove('3fa85f64-5717-4562-b3fc-2c963f66afa6')
        expect(productService.remove).toHaveBeenCalledTimes(1);
      });
      it('should call productController.remove and productService.remove and return proper result', async () => {
        jest.spyOn(productService, 'remove').mockResolvedValue('')
        const result = await productController.remove('3fa85f64-5717-4562-b3fc-2c963f66afa6')
        expect(result).toEqual('');
      });
    })
  })

});
