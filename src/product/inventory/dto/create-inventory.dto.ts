import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNumber, IsUUID } from 'class-validator';

export class CreateInventoryDto {
  @ApiProperty({
    type: 'uuid',
    description: 'Product Id.',
  })
  @IsDefined()
  @IsUUID()
  productId: string;

  @ApiProperty({
    type: String,
    description: 'Total quantity.',
  })
  @IsDefined()
  @IsNumber()
  totalQty: number;

  @ApiProperty({
    type: String,
    description: 'Created by.',
  })
  @IsDefined()
  @IsUUID()
  createdBy: string;
}
