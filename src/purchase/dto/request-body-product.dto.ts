import { ApiProperty } from '@nestjs/swagger';

export class RequestBodyProductDto {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
    description: 'Product table primary key',
  })
  id: string;

  @ApiProperty({
    type: Number,
    description: 'Quantity of product',
  })
  qty: number;
}
