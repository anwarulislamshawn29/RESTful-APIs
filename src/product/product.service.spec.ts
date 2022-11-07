import { ForbiddenException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ListParametersDto } from '../shared/dto/list-parameters.dto';
import { UtilsService } from '../shared/services/utils/utils.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ResponseCreateProductDto } from './dto/response-create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';

const mockProductRepository = () => ({
  createProduct: jest.fn(),
  findAProduct: jest.fn(),
  findOne: jest.fn(),
  findProductList: jest.fn(),
  updateProduct: jest.fn(),
  deleteProduct: jest.fn()
})
const mockUtilsService = () => ({
  generatCode: jest.fn(),
  getMetaData: jest.fn()
})
describe('ProductService', () => {
  let productService: ProductService;
  let productRepository: ProductRepository;
  let utilsService: UtilsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService,
        {
          provide: ProductRepository,
          useFactory: mockProductRepository

        },
        {
          provide: UtilsService,
          useFactory: mockUtilsService
        }],
    }).compile();

    productService = module.get<ProductService>(ProductService);
    productRepository = module.get<ProductRepository>(ProductRepository);
    utilsService = module.get<UtilsService>(UtilsService)
  });
  describe('Should define the functions in productService', () => {
    it('should be defined the productService.create', () => {
      expect(productService.create).toBeDefined();
    });
    it('should be defined the productService.findAProduct', () => {
      expect(productService.findAProduct).toBeDefined();
    });
    it('should be defined the productService.findAll', () => {
      expect(productService.findAll).toBeDefined();
    });
    it('should be defined the productService.update', () => {
      expect(productService.update).toBeDefined();
    });
    it('should be defined the productService.remove', () => {
      expect(productService.remove).toBeDefined();
    });
  })

  describe('Should call productService.create', () => {
    it('should call productService.create with all functions inside it', async () => {
      jest.spyOn(utilsService, 'generatCode').mockReturnValue(null)
      jest.spyOn(productService, 'isProductExists').mockResolvedValue(null)
      jest.spyOn(productRepository, 'createProduct').mockResolvedValue(new ResponseCreateProductDto)
      await productService.create(new CreateProductDto)
      expect(utilsService.generatCode).toHaveBeenCalledTimes(1)
      expect(productService.isProductExists)
        .toHaveBeenCalledTimes(1)
      expect(productRepository.createProduct).toHaveBeenCalledTimes(1)
    });

    it('should throw exception if product exists', async () => {
      jest.spyOn(utilsService, 'generatCode').mockReturnValue(null)
      jest.spyOn(productService, 'isProductExists').mockResolvedValue(new Product)
      jest.spyOn(productRepository, 'createProduct').mockResolvedValue(new ResponseCreateProductDto)
      await expect(productService.create(new CreateProductDto)).rejects.toThrow(ForbiddenException);
    });
  })

  describe('Should call productService.findAProduct', () => {
    it('should call productService.findAProduct and response properly', async () => {
      jest.spyOn(productRepository, 'findAProduct').mockResolvedValue(new Product)
      const product = await productService.findAProduct('')
      expect(product).toEqual(new Product)
    });
  })

  describe('Should call productService.isProductExists', () => {
    it('should call productService.isProductExists and response properly', async () => {
      jest.spyOn(productRepository, 'findOne').mockResolvedValue(new Product)
      const product = await productService.isProductExists('', '', 1)
      expect(product).toEqual(new Product)
    });
  })

  describe('Should call productService.findAll', () => {

    it('should call productRepository.findProductList once', async () => {
      jest.spyOn(productRepository, 'findProductList').mockResolvedValue([Array(1), 1])
      jest.spyOn(utilsService, 'getMetaData').mockReturnValue(null)
      await productService.findAll(new ListParametersDto)
      expect(productRepository.findProductList).toHaveBeenCalledTimes(1)
    });

    it('should call productService.isProductExists and response properly', async () => {
      jest.spyOn(productRepository, 'findProductList').mockResolvedValue([Array(1), 1])
      jest.spyOn(utilsService, 'getMetaData').mockReturnValue(null)
      const products = await productService.findAll(new ListParametersDto)
      expect(typeof products).toEqual("object")
    });
  })

  describe('Should call productService.update', () => {

    it('should call productRepository.updateProduct once', async () => {
      jest.spyOn(productRepository, 'updateProduct').mockResolvedValue(new Product)
      await productService.update('', new UpdateProductDto)
      expect(productRepository.updateProduct).toHaveBeenCalledTimes(1)
    });

    it('should call productService.update and response properly', async () => {
      jest.spyOn(productRepository, 'updateProduct').mockResolvedValue(new Product)
      const product = await productService.update('', new UpdateProductDto)
      expect(typeof product).toEqual("object")
    });
  })

  describe('Should call productService.remove', () => {

    it('should call productRepository.deleteProduct once', async () => {
      jest.spyOn(productRepository, 'deleteProduct').mockResolvedValue(null)
      await productService.remove('')
      expect(productRepository.deleteProduct).toHaveBeenCalledTimes(1)
    });

    it('should call productService.remove and response properly', async () => {
      jest.spyOn(productRepository, 'deleteProduct').mockResolvedValue(null)
      const response = await productService.remove('')
      expect(typeof response).toEqual("object")
    });
  })

});
