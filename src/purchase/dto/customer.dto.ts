import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEnum, IsUUID } from 'class-validator';
import { CustomerTypeEnum } from '../enum/customer-type.enum';

export class CustomerDto {
  @ApiProperty({
    type: String,
    example: 'Mr. xyz',
    description: 'User name/ Customer name!',
  })
  name: string;

  @ApiProperty({
    type: String,
    example: 'Customer address',
    description: 'House#20, Road#30, Block#C, Dhaka',
  })
  address: string;

  @ApiProperty({
    type: String,
    example: '8801999999999',
    description: 'Customer contact number',
  })
  contactNumber: string;

  @ApiProperty({
    type: String,
    enum: CustomerTypeEnum,
    default: CustomerTypeEnum.OLD,
  })
  @IsDefined()
  @IsEnum(CustomerTypeEnum)
  type: string;

  @ApiProperty({
    type: String,
    description: 'Created by.',
  })
  @IsDefined()
  @IsUUID()
  createdBy: string;
}
