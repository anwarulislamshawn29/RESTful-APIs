import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Product } from '../product/entities/product.entity';
import { ProductRepository } from '../product/product.repository';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { Inventory } from './entities/inventory.entity';
import { InventoryRepository } from './inventory.repository';
import { InventoryService } from './inventory.service';

const mockProductRepository = () => ({
  findAProduct: jest.fn()
})

const mockInventoryRepository = () => ({
  findInventoryById: jest.fn(),
  updateInventory: jest.fn(),
  findInventoryByProductId: jest.fn(),
  createInventory: jest.fn()
})
describe('InventoryService', () => {
  let inventoryService: InventoryService;
  let inventoryRepository: InventoryRepository;
  let productRepository: ProductRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InventoryService, {
        provide: InventoryRepository,
        useFactory: mockInventoryRepository
      }, {
          provide: ProductRepository,
          useFactory: mockProductRepository
        }],
    }).compile();

    inventoryService = module.get<InventoryService>(InventoryService);
    inventoryRepository = module.get<InventoryRepository>(InventoryRepository);
    productRepository = module.get<ProductRepository>(ProductRepository)
  });
  describe('Should call inventoryService.updateInventory', () => {
    it('should call inventoryService.updateInventory with inventoryRepository.findInventoryById and inventoryRepository.updateInventory once', async () => {
      jest.spyOn(inventoryRepository, 'findInventoryById').mockResolvedValue(new Inventory)
      jest.spyOn(inventoryRepository, 'updateInventory').mockResolvedValue(new Inventory)
      await inventoryService.updateInventory('', new UpdateInventoryDto)
      expect(inventoryRepository.findInventoryById).toHaveBeenCalledTimes(1)
      expect(inventoryRepository.updateInventory).toHaveBeenCalledTimes(1)
    });

    it('should call inventoryService.updateInventory and return with proper result', async () => {
      jest.spyOn(inventoryRepository, 'findInventoryById').mockResolvedValue(new Inventory)
      jest.spyOn(inventoryRepository, 'updateInventory').mockResolvedValue(new Inventory)
      const result = await inventoryService.updateInventory('', new UpdateInventoryDto)
      expect(result).toEqual(new Inventory)
    });

    it('should throw BadRequestException if provided totalqty is a negative value', async () => {
      const mockUpdateInventoryDto = {
        id: '',
        totalQty: -1,
        availableQty: 0
      }
      const mockInventory = new Inventory
      jest.spyOn(inventoryRepository, 'findInventoryById').mockResolvedValue(mockInventory)
      jest.spyOn(inventoryRepository, 'updateInventory').mockResolvedValue(mockInventory)
      await
        expect(inventoryService.updateInventory('', mockUpdateInventoryDto)).rejects.toThrow(BadRequestException)
    });
  })

  describe('Should call inventoryService.createInventory', () => {
    it('should call inventoryService.createInventory with productRepository.findAProduct, inventoryRepository.findInventoryByProductId and inventoryRepository.createInventory once', async () => {
      jest.spyOn(productRepository, 'findAProduct').mockResolvedValue(new Product)
      jest.spyOn(inventoryRepository, 'findInventoryByProductId').mockResolvedValue(null)
      jest.spyOn(inventoryRepository, 'createInventory').mockResolvedValue(new Inventory)
      await inventoryService.createInventory(new CreateInventoryDto)
      expect(productRepository.findAProduct).toHaveBeenCalledTimes(1)
      expect(inventoryRepository.findInventoryByProductId).toHaveBeenCalledTimes(1)
      expect(inventoryRepository.createInventory).toHaveBeenCalledTimes(1)
    });

    it('should call inventoryService.createInventory and return with proper result if no inventory with the provided product id', async () => {
      jest.spyOn(productRepository, 'findAProduct').mockResolvedValue(new Product)
      jest.spyOn(inventoryRepository, 'findInventoryByProductId').mockResolvedValue(null)
      jest.spyOn(inventoryRepository, 'createInventory').mockResolvedValue(new Inventory)
      const result = await inventoryService.createInventory(new CreateInventoryDto)
      expect(result).toEqual(new Inventory)
    });

    it('should throw BadRequestException if inventory already exists with provided product id', async () => {
      jest.spyOn(productRepository, 'findAProduct').mockResolvedValue(new Product)
      jest.spyOn(inventoryRepository, 'findInventoryByProductId').mockResolvedValue(new Inventory)
      jest.spyOn(inventoryRepository, 'createInventory').mockResolvedValue(new Inventory)
      await
        expect(inventoryService.createInventory(new CreateInventoryDto)).rejects.toThrow(ForbiddenException)
    });
  })

});
