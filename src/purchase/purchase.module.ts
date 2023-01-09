import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseRepository } from './purchase.repository';
import { UtilsService } from '../shared/services/utils/utils.service';
import { ProductRepository } from '../product/product.repository';
import { AuthModule } from '../auth/auth.module';
import { InventoryRepository } from '../inventory/inventory.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PurchaseRepository,
      ProductRepository,
      InventoryRepository
    ]),
    AuthModule
  ],
  controllers: [PurchaseController],
  providers: [PurchaseService, UtilsService],
})
export class PurchaseModule { }
