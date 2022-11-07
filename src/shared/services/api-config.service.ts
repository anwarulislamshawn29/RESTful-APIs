import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Inventory } from '../../inventory/entities/inventory.entity';
import { Product } from '../../product/entities/product.entity';
import { Customer } from '../../purchase/entities/customer.entity';
import { SoldProduct } from '../../purchase/entities/soldProduct.entity';
import { Purchase } from '../../purchase/entities/purchase.entity';
import { AuthCredentials } from '../../access/entities/auth-credentials.entity';

@Injectable()
export class ApiConfigService {
  constructor(private configService: ConfigService) { }

  get typeOrmConfig(): TypeOrmModuleOptions {
    const migrations = [__dirname + '/../database/migrations/*{.ts,.js}'];
    const entities = [Product, AuthCredentials, Inventory, Purchase, Customer, SoldProduct];
    const isProduction = this.configService.get('STAGE') === 'prod';
    return {
      ssl: isProduction,
      extra: {
        ssl: isProduction ? { rejectUnauthorized: false } : null,
      },
      entities,
      migrations,
      type: 'postgres',
      host: this.configService.get('DB_HOST'),
      username: this.configService.get('DB_USERNAME'),
      password: this.configService.get('DB_PASSWORD'),
      database: this.configService.get('DB_DATABASE'),
      port: this.configService.get('DB_PORT'),
      autoLoadEntities: true,
      synchronize: true,
    };
  }
}
