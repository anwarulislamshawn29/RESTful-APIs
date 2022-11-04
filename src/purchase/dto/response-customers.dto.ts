import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from '../../shared/dto/pagination.dto';
import { CustomerDto } from './customer.dto';

export class ResponseCustomersDto {
  @ApiProperty({ type: [CustomerDto] })
  items: CustomerDto[];
  @ApiProperty({ type: () => PaginationDto })
  metadata: PaginationDto;
}
