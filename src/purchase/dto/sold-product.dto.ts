import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDefined, IsUUID } from 'class-validator';

export class SoldProductDto {
  @ApiProperty({
    type: String,
    description: 'Purchase Id.',
  })
  @IsDefined()
  @IsUUID()
  purchaseId: string;

  @ApiProperty()
  @IsArray()
  idQtyPrice: [{ id: string; qty: number; price: number }];

  @ApiProperty({
    type: Number,
    example: 1000,
    description: 'Unit price of the product',
  })
  unitPrice: number;
}
