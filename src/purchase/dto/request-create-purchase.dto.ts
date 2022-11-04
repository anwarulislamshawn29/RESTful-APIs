import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEnum, IsNumber, IsString, IsUUID } from 'class-validator';
import { PurchaseEnum } from '../enum/purchase-status.enum';

export class RequestCreatePurchaseDto {
  @ApiProperty({
    type: Number,
    example: 1000,
    description: 'Total amount for the purchase',
  })
  total: number;

  @ApiProperty({
    enum: PurchaseEnum,
    default: PurchaseEnum.COMPLETED,
  })
  @IsDefined()
  @IsEnum(PurchaseEnum)
  status: string;

  @ApiProperty({
    type: Number,
    description: 'VAT applicable on total amount',
  })
  @IsDefined()
  @IsNumber()
  vat: number;

  @ApiProperty({
    type: Number,
    description: 'Discount given on total amount',
  })
  @IsDefined()
  @IsNumber()
  discount: number;

  @ApiProperty({
    type: Number,
    description: 'Payable total amount',
  })
  @IsDefined()
  @IsNumber()
  payable: number;

  @ApiProperty({
    type: String,
    description: 'Customer Id.',
  })
  @IsDefined()
  @IsUUID()
  customerId: string;

  @ApiProperty({
    type: String,
    description: 'Invoice Id.',
  })
  @IsDefined()
  @IsString()
  purchaseCode: string;

  @ApiProperty({
    type: String,
    description: 'Created by.',
  })
  @IsDefined()
  @IsUUID()
  createdBy: string;
}
