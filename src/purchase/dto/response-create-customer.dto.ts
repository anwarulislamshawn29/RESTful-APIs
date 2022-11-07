import { OmitType } from '@nestjs/swagger';
import { CustomerDto } from './customer.dto';

export class ResponseCreateCustomerDto extends OmitType(CustomerDto, [
  'createdBy',
] as const) { }
