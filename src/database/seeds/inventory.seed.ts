import { Factory, Seeder } from 'typeorm-seeding';
import { Connection, getRepository } from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { Inventory } from '../../product/inventory/entities/inventory.entity';

export default class InventorySeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const qb = getRepository(Product)
      .createQueryBuilder('product')
      .select(['product.id', 'product.name'])
      .where('product.deletedAt is NULL');
    const result = await qb.getMany();

    const createdBy = '87439ce8-1a2a-4cb6-b838-b0265f908238';
    await Promise.all(
      result.map(async (entity) => {
        const inventory = {
          totalQty: 200,
          availableQty: 200,
          createdBy: createdBy,
          updatedBy: createdBy,
          productId: entity.id,
        };

        await connection
          .createQueryBuilder()
          .insert()
          .into(Inventory)
          .values(inventory)
          .execute();
      }),
    );
  }
}
