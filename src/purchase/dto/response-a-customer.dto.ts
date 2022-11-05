import { OmitType } from '@nestjs/swagger';
import { CustomerDto } from './customer.dto';

export class ResponseACustomerDto extends OmitType(CustomerDto, [
  'createdBy',
] as const) { }
