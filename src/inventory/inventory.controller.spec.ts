import { Test, TestingModule } from '@nestjs/testing';
import { ResponseUpdateInventoryDto } from '../product/dto/response-update-inventory.dto';
import { ResponseCreateInventoryDto } from '../product/dto/response-create-inventory.dto';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';

const mockInventoryService = () => ({
  createInventory: jest.fn(),
  updateInventory: jest.fn(),
})

describe('InventoryController', () => {
  let inventoryController: InventoryController;
  let inventoryService: InventoryService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InventoryController],
      providers: [
        {
          provide: InventoryService,
          useFactory: mockInventoryService
        }],
    }).compile();

    inventoryController = module.get<InventoryController>(InventoryController);
    inventoryService = module.get<InventoryService>(InventoryService)
  });
  describe('Should call inventoryController.createInventory', () => {
    it('Should be called inventoryController.createInventory with inventoryService.createInventory once', async () => {
      jest.spyOn(inventoryService, 'createInventory').mockResolvedValue(new ResponseCreateInventoryDto)
      await inventoryController.createInventory(new CreateInventoryDto)
      expect(inventoryService.createInventory).toHaveBeenCalledTimes(1);
    });
    it('Should be called inventoryController.createInventory with inventoryService.createInventory and return proper response', async () => {
      jest.spyOn(inventoryService, 'createInventory').mockResolvedValue(new ResponseCreateInventoryDto)
      const response = await inventoryController.createInventory(new CreateInventoryDto)
      expect(response).toEqual(new ResponseCreateInventoryDto);
    });
  })
  describe('Should call inventoryController.updateInventory', () => {
    it('Should be called inventoryController.updateInventory with inventoryService.updateInventory once', async () => {
      jest.spyOn(inventoryService, 'updateInventory').mockResolvedValue(new ResponseUpdateInventoryDto)
      await inventoryController.updateInventory('', new UpdateInventoryDto)
      expect(inventoryService.updateInventory).toHaveBeenCalledTimes(1);
    });
    it('Should be called inventoryController.updateInventory with inventoryService.updateInventory and return proper response', async () => {
      jest.spyOn(inventoryService, 'updateInventory').mockResolvedValue(new ResponseUpdateInventoryDto)
      const response = await inventoryController.updateInventory('', new UpdateInventoryDto)
      expect(response).toEqual(new ResponseUpdateInventoryDto);
    });
  })

});
