import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class RequestBodyProductDto {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
    description: 'Product table primary key',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    type: Number,
    description: 'Quantity of product',
  })
  qty: number;
}
