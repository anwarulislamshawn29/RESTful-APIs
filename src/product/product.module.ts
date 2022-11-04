import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from './product.repository';
import { UtilsService } from 'src/shared/services/utils/utils.service';
import { InventoryRepository } from './inventory/inventory.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductRepository, InventoryRepository])],
  controllers: [ProductController],
  providers: [ProductService, UtilsService],
})
export class ProductModule {}
