import { Test, TestingModule } from '@nestjs/testing';
import { InventoryRepository } from './inventory.repository';
import { InventoryService } from './inventory.service';

describe('InventoryService', () => {
  let inventoryService: InventoryService;
  let inventoryRepository: InventoryRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InventoryService],
    }).compile();

    inventoryService = module.get<InventoryService>(InventoryService);
  });

  it('should be defined', () => {
    expect(inventoryService).toBeDefined();
  });
});
