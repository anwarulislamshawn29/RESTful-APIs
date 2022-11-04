import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { UpdateInventoryDto } from '../dto/update-inventory.dto';
import { Inventory } from './entities/inventory.entity';

@EntityRepository(Inventory)
export class InventoryRepository extends Repository<Inventory> {
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
}
