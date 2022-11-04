import { PickType } from '@nestjs/swagger';
import { ProductDto } from './product.dto';

export class ResponseCreateProductDto extends PickType(ProductDto, [
  'name',
  'brandName',
  'code',
  'price',
  'createdBy',
] as const) {}
