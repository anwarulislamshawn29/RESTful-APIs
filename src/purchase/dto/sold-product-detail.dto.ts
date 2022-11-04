import { ApiProperty } from '@nestjs/swagger';

export class SoldProductDetailDto {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
    description: 'Product code',
  })
  id: string;

  @ApiProperty({
    type: 'string',
    format: 'uuid',
    description: 'Product table primary key',
  })
  productId: string;

  @ApiProperty({
    type: 'string',
    format: 'uuid',
    description: 'Purchase table primary key',
  })
  purchaseId: string;

  @ApiProperty({
    type: 'number',
    description: 'Quantity of the product',
  })
  qty: number;

  @ApiProperty({
    type: 'number',
    description: 'Unit price of the product',
  })
  unitPrice: number;


  @ApiProperty({
    type: Date,
    example: '2022-08-14T12:21:27.612Z',
    description: 'Date of purchase',
  })
  created: Date;

  @ApiProperty({
    type: Date,
    example: '2022-08-14T12:21:27.612Z',
    description: 'Purchase data update date',
  })
  updated: Date;

  @ApiProperty({
    type: Date,
    example: '2022-08-14T12:21:27.612Z',
    description: 'Purchase data delete date',
  })
  deletedAt: Date;
}
