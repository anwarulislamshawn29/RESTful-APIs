import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty({
    type: String,
    example: 'bl543jr',
    description: 'Product code',
  })
  PRODUCT_CODE: string;

  @ApiProperty({
    type: 'string',
    description: 'Customer name',
  })
  NAME: string;

  @ApiProperty({
    type: 'string',
    description: 'Brand name',
  })
  BRAND: string;

  @ApiProperty({
    type: 'number',
    description: 'Price of the product',
  })
  PRICE: number;

  @ApiProperty({
    type: 'number',
    description: 'Purchase quantity',
  })
  QUANTITY: number;
}
