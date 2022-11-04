import { number, string } from '@hapi/joi';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsPhoneNumber } from 'class-validator';
import { CustomerTypeEnum } from '../enum/customer-type.enum';
import { PurchaseEnum } from '../enum/purchase-status.enum';
import { ProductDto } from './products.dto';

export class ResponseInvoicesDto {
  @ApiProperty({
    type: Date,
    description: 'Date of transection',
  })
  DATE: Date;

  @ApiProperty({
    type: String,
    example: 'QAb3ht3',
    description: 'PurchaseCode/Invoice ID',
  })
  INVOICE_ID: string;

  @ApiProperty({
    type: String,
    description: 'Name of the customer',
  })
  CUSTOMER_NAME: string;

  @ApiProperty({
    type: Number,
    example: '+99882323232',
    description: 'Contact number of customer',
  })
  @IsPhoneNumber()
  CUSTOMER_CONTACT: number;

  @ApiProperty({
    type: String,
    description: 'Address of the customer',
  })
  CUSTOMER_ADDRESS: string;

  @ApiProperty({
    enum: CustomerTypeEnum,
    description: 'Contact number of customer',
  })
  @IsEnum(CustomerTypeEnum)
  CUSTOMER_TYPE: string;

  @ApiProperty({ type: () => [ProductDto] })
  PRODUCTS: ProductDto[];

  @ApiProperty({
    type: Number,
    example: 1000,
    description: 'Total amount',
  })
  TOTAL: number;

  @ApiProperty({
    type: Number,
    example: 100,
    description: 'Applicable discount amount',
  })
  DISCOUNT: number;

  @ApiProperty({
    type: Number,
    description: 'Sub total',
  })
  SUB_TOTAL: number;

  @ApiProperty({
    type: Number,
    description: 'Applicable VAT amount',
  })
  VAT: number;

  @ApiProperty({
    type: Number,
    description: 'Payable amount',
  })
  PAYABLE: number;

  @ApiProperty({
    enum: PurchaseEnum,
    description: 'Status of the purchase',
  })
  @IsEnum(PurchaseEnum)
  STATUS: PurchaseEnum;
}
