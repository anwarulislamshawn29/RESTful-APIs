import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from './product.repository';
import { UtilsService } from '../shared/services/utils/utils.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductRepository]),
    AuthModule],
  controllers: [ProductController],
  providers: [ProductService, UtilsService],
})
export class ProductModule { }
