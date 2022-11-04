import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { CustomerTypeEnum } from '../enum/customer-type.enum';

export class UpdateCustomerTypeDto {
  @ApiProperty({
    type: String,
    example: 'Mr. xyz',
    description: 'User name/ Customer name!',
  })
  @IsOptional()
  name?: string;

  @ApiProperty({
    type: String,
    example: 'Customer address',
    description: 'House#20, Road#30, Block#C, Dhaka',
  })
  @IsOptional()
  address?: string;

  @ApiProperty({
    type: String,
    example: '8801999999999',
    description: 'Customer contact number',
  })
  @IsOptional()
  contactNumber?: string;

  @ApiProperty({
    type: String,
    enum: CustomerTypeEnum,
    default: CustomerTypeEnum.NEW,
  })
  @IsEnum(CustomerTypeEnum)
  @IsOptional()
  type?: string;
}
