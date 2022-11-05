import { NotFoundException } from '@nestjs/common';
import { EntityRepository, getConnection, getManager, Repository } from 'typeorm';
import { ResponseCreateInventoryDto } from '../product/dto/response-create-inventory.dto';
import { UpdateInventoryDto } from '../inventory/dto/update-inventory.dto';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { Inventory } from './entities/inventory.entity';

@EntityRepository(Inventory)
export class InventoryRepository extends Repository<Inventory> {

  async createInventory(
    createInventoryDto: CreateInventoryDto,
  ): Promise<ResponseCreateInventoryDto> {
    const inventory = {
      totalQty: createInventoryDto.totalQty,
      availableQty: createInventoryDto.totalQty,
      createdBy: createInventoryDto.createdBy,
      productId: createInventoryDto.productId,
    };
    let inventories: any;
    try {
      inventories = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Inventory)
        .values(inventory)
        .execute()
        .then((response) => response.raw[0]);
    } catch (err) {
      return Promise.reject(err);
    }
    const result = {
      productId: inventories.id,
      created: inventories.created,
      updated: inventories.updated,
    };
    return result;
  }

  async updateInventory(id: string, updateInventoryDto: UpdateInventoryDto) {
    let updatedInventory: Inventory;
    try {
      const inventory = await this.findOne(id);
      if (!inventory) {
        throw new NotFoundException(
          `No inventory found with inventoryId "${id}"`,
        );
      }
      const { availableQty } = updateInventoryDto;

      updatedInventory = this.create({
        id: inventory.id,
        availableQty,
      });

      await this.save(updatedInventory);
    } catch (err) {
      return Promise.reject(err);
    }
    return updatedInventory;
  }

  async findInventoryByProductId(productId: string) {
    let inventory: Inventory;
    try {
      inventory = await getManager()
        .createQueryBuilder(Inventory, 'inventory')
        .where('inventory.productId = :productId', { productId })
        .getOne();
    } catch (err) {
      return Promise.reject(err);
    }
    return inventory;
  }

  async findInventoryById(id: string) {
    let inventory: Inventory;
    try {
      inventory = await getManager()
        .createQueryBuilder(Inventory, 'inventory')
        .where('inventory.id = :id', { id })
        .getOne();
      if (!inventory) {
        throw new NotFoundException(`No inventory found with id "${id}"`);
      }
    } catch (err) {
      return Promise.reject(err);
    }
    return inventory;
  }

}
