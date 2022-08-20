import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Restaurant } from '../../restaurents/entities/restaurants.entity';
import { PaymentHistory } from '../../purchase/entities/paymentHistory.entity';
import { User } from '../../purchase/user/entities/user.entity';
import { DishInventory } from '../../restaurents/entities/dish-inventory.entity';
import { Menu } from '../../restaurents/menu/entities/menu.entity';
import { OpeningHours } from '../../restaurents/opening-hours/entities/openingHours.entity';



@Injectable()
export class ApiConfigService {
  constructor(private configService: ConfigService) { }

  get typeOrmConfig(): TypeOrmModuleOptions {
    const migrations = [__dirname + '/../database/migrations/*{.ts,.js}'];
    const entities = [
      Restaurant,
      Menu,
      OpeningHours,
      PaymentHistory,
      User,
      DishInventory,
    ];
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
