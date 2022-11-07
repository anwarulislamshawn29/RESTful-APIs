import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseCreateInventoryDto } from '../product/dto/response-create-inventory.dto';
import { ResponseUpdateInventoryDto } from '../product/dto/response-update-inventory.dto';
import { ProductRepository } from '../product/product.repository';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { InventoryRepository } from './inventory.repository';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(InventoryRepository)
    private inventoryRepository: InventoryRepository,
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
  ) { }
  async updateInventory(
    id: string,
    updateInventoryDto: UpdateInventoryDto,
  ): Promise<ResponseUpdateInventoryDto> {
    await this.inventoryRepository.findInventoryById(id);
    if (
      updateInventoryDto.totalQty < 0 || updateInventoryDto.availableQty < 0
    ) {
      throw new BadRequestException(`Invalid input value"`);
    }
    return await this.inventoryRepository.updateInventory(
      id,
      updateInventoryDto,
    );
  }

  async createInventory(
    createInventoryDto: CreateInventoryDto,
  ): Promise<ResponseCreateInventoryDto> {
    await this.productRepository.findAProduct(createInventoryDto.productId);
    const inventory = await this.inventoryRepository.findInventoryByProductId(
      createInventoryDto.productId,
    );
    if (inventory) {
      throw new ForbiddenException(
        {
          code: 'BAD_REQUEST',
          message: `Inventory already created`,
          details: [
            {
              inventoryId: inventory.id,
              productId: inventory.productId,
              totalQty: inventory.totalQty,
            },
          ],
          timeStamp: new Date().toISOString(),
        },
        'This operation is not permitted',
      );
    }
    return await this.inventoryRepository.createInventory(createInventoryDto);
  }
}
