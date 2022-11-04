import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

import { Product } from '../../product/entities/product.entity';

export default class ProductSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const entities = [
      {
        name: 'water filter',
        brandName: 'media',
        code: 'ul133jv',
        price: 1020.0,
      },
      {
        name: 'bulb',
        brandName: 'excellent',
        code: 'bl623jr',
        price: 1500.0,
      },
      {
        name: 'pump',
        brandName: 'excellent',
        code: 'bl143jr',
        price: 190.0,
      },
      {
        name: 'foil',
        brandName: 'excellent',
        code: 'xl103jr',
        price: 1390.0,
      },
      {
        name: 'e pump',
        brandName: 'excellent',
        code: 'bl123jr',
        price: 920.0,
      },
      {
        name: 'swing machine',
        brandName: 'excellent',
        code: 'bl543jr',
        price: 8320.0,
      },
      {
        name: 'water heater',
        brandName: 'excellent',
        code: 'xl163jr',
        price: 1940.0,
      },
      {
        name: 'cooler',
        brandName: 'excellent',
        code: 'bl253jr',
        price: 5820.0,
      },
      {
        name: 'rice coocker',
        brandName: 'excellent',
        code: 'bl503jr',
        price: 9920.0,
      },
      {
        name: 'water purifire',
        brandName: 'excellent',
        code: 'xl123jr',
        price: 120.0,
      },
    ];

    const createdBy = '87439ce8-1a2a-4cb6-b838-b0265f908238';

    await Promise.all(
      entities.map(async (entity) => {
        const product = {
          name: entity.name,
          brandName: entity.brandName,
          code: entity.code,
          price: entity.price,
          inventoryStatus: 'available',
          createdBy: createdBy,
          updatedBy: createdBy,
        };

        await connection
          .createQueryBuilder()
          .insert()
          .into(Product)
          .values(product)
          .execute();
      }),
    );
  }
}
