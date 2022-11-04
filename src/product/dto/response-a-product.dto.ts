import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsDefined, IsUUID } from 'class-validator';
import { ProductDto } from './product.dto';

export class ResponseAProductDto extends PickType(ProductDto, [
  'name',
  'brandName',
  'price',
  'code',
  'createdBy',
] as const) {
  @ApiProperty({
    type: String,
    description: 'Unique identifier of a product.',
  })
  @IsDefined()
  @IsUUID()
  id: string;
}
