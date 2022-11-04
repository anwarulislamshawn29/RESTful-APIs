import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDefined,
  IsEnum,
  IsNumber,
  IsUUID,
  Max,
  Min,
} from 'class-validator';
import { PurchaseEnum } from '../enum/purchase-status.enum';
import { RequestBodyProductDto } from './request-body-product.dto';

export class CreatePurchaseDto {

  @ApiProperty({ type: [RequestBodyProductDto] })
  productList: RequestBodyProductDto[];

  @ApiProperty({
    type: String,
    enum: PurchaseEnum,
    default: PurchaseEnum.COMPLETED,
  })
  @IsDefined()
  @IsEnum(PurchaseEnum)
  status: string;

  @ApiProperty({
    type: Number,
    description: 'Discount in percentage.',
  })
  @IsDefined()
  @IsNumber()
  @Min(0)
  @Max(100)
  discountInPercentage: number;

  @ApiProperty({
    type: Number,
    description: 'VAT in percentage.',
  })
  @IsDefined()
  @IsNumber()
  @Min(0)
  @Max(100)
  vatInPercentage: number;

  @ApiProperty({
    type: 'string',
    format: 'uuid',
    description: 'Created by.',
  })
  @IsDefined()
  @IsUUID()
  createdBy: string;
}
