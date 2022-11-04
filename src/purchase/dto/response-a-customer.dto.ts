import { OmitType } from '@nestjs/swagger';
import { Customer } from '../entities/customer.entity';

export class ResponseACustomerDto extends OmitType(Customer, [
  'createdBy',
] as const) {}
