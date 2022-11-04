import { OmitType } from '@nestjs/swagger';
import { Customer } from '../entities/customer.entity';

export class ResponseCreateCustomerDto extends OmitType(Customer, [
  'createdBy',
  'created',
  'updated',
  'purchases',
  'updatedBy',
  'deletedAt',
] as const) {}
