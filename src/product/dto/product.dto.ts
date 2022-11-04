import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEnum, IsNumber, IsString, IsUUID } from 'class-validator';
import { PrefixProductCode } from '../../product/enum/prefix-product-code.enum';
import { InventoryStatusEnum } from '../enum/inventory-status.enum';

export class ProductDto {
  @ApiProperty({
    type: String,
    description: 'Product name.',
  })
  @IsDefined()
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    description: 'Brand name.',
  })
  @IsDefined()
  @IsString()
  brandName: string;

  @ApiProperty({
    type: 'string',
    enum: PrefixProductCode,
    default: PrefixProductCode.QA,
  })
  @IsDefined()
  @IsEnum(PrefixProductCode)
  code: string;

  @ApiProperty({
    type: 'string',
    enum: InventoryStatusEnum,
    default: InventoryStatusEnum.AVAILABLE,
  })
  @IsDefined()
  @IsEnum(InventoryStatusEnum)
  inventoryStatus: string;

  @ApiProperty({
    type: String,
    description: 'Price.',
  })
  @IsDefined()
  @IsNumber()
  price: number;

  @ApiProperty({
    type: String,
    description: 'Created by.',
  })
  @IsDefined()
  @IsUUID()
  createdBy: string;
}
