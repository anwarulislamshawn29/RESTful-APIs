import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { InventoryStatusEnum } from '../enum/inventory-status.enum';

export class UpdateProductDto {
  @ApiProperty({
    type: String,
    description: 'Product name.',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    type: String,
    description: 'Brand name.',
  })
  @IsOptional()
  @IsString()
  brandName?: string;

  @ApiProperty({
    type: String,
    description: 'Price.',
  })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiProperty({
    type: String,
    description: 'Inventory status.',
  })
  @IsOptional()
  @IsEnum(InventoryStatusEnum)
  inventoryStatus: string;
}
