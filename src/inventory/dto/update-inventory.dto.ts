import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

export class UpdateInventoryDto {

  @ApiProperty({
    type: 'string',
    format: 'uuid',
    description: 'Inventory Id.',
  })
  @IsUUID()
  @IsOptional()
  id?: string;

  @ApiProperty({
    type: String,
    description: 'Total quantity.',
  })
  @IsOptional()
  totalQty?: number;

  @ApiProperty({
    type: String,
    description: 'Total quantity.',
  })
  @IsOptional()
  availableQty?: number;
}
