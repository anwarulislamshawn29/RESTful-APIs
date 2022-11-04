import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEnum, IsNumber, IsString, IsUUID } from 'class-validator';
import { PurchaseEnum } from '../enum/purchase-status.enum';

export class ProductDetailDto {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
    description: 'Purchase primery key.',
  })
  @IsDefined()
  @IsUUID()
  id: string;

  @ApiProperty({
    type: String,
    description: 'Unique code of particuler purchase',
  })
  @IsDefined()
  @IsString()
  purchaseCode: string;

  @ApiProperty({
    type: 'string',
    format: 'uuid',
    description: 'Customer Id.',
  })
  @IsDefined()
  @IsUUID()
  customerId: string;

  @ApiProperty({
    type: Number,
    description: 'Discount amount',
  })
  @IsDefined()
  @IsNumber()
  discount: number;

  @ApiProperty({
    type: Number,
    description: 'Total amount',
  })
  @IsDefined()
  @IsNumber()
  total: number;

  @ApiProperty({
    type: Number,
    description: 'VAT amount',
  })
  @IsDefined()
  @IsNumber()
  vat: number;

  @ApiProperty({
    type: Number,
    description: 'Payable',
  })
  @IsDefined()
  @IsNumber()
  payable: number;

  @ApiProperty({
    type: String,
    enum: PurchaseEnum,
    default: PurchaseEnum.COMPLETED,
  })
  @IsDefined()
  @IsEnum(PurchaseEnum)
  status: string;

  @ApiProperty({
    type: Date,
    example: '2022-08-14T12:21:27.612Z',
    description: 'Date of purchase',
  })
  created: Date;

  @ApiProperty({
    type: Date,
    example: '2022-08-14T12:21:27.612Z',
    description: 'Date of update purchase',
  })
  updated: Date;

  @ApiProperty({
    type: 'string',
    format: 'uuid',
    description: 'Created by.',
  })
  @IsDefined()
  @IsUUID()
  createdBy: string;

  @ApiProperty({
    type: 'string',
    format: 'uuid',
    description: 'Created by.',
  })
  @IsDefined()
  @IsUUID()
  updatedBy: string;
}
