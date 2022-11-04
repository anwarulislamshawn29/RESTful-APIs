import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsDefined, IsUUID } from 'class-validator';

export class ResponseCreateInventoryDto {
  @ApiProperty({
    type: 'uuid',
    description: 'Product Id.',
  })
  @IsDefined()
  @IsUUID()
  productId: string;

  @ApiProperty({
    type: String,
    description: 'Created date.',
  })
  @IsDefined()
  @IsDateString()
  created: Date;

  @ApiProperty({
    type: String,
    description: 'Updated date.',
  })
  @IsDefined()
  @IsDateString()
  updated: Date;
}
