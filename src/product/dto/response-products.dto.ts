import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from '../../shared/dto/pagination.dto';
import { ProductDto } from './product.dto';

export class ResponseProductsDto {
  @ApiProperty({ type: [ProductDto] })
  items: ProductDto[];
  @ApiProperty({ type: () => PaginationDto })
  metadata: PaginationDto;
}
