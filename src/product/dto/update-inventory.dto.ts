import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateInventoryDto {
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
