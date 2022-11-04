import { ApiProperty } from '@nestjs/swagger';
import { ProductDetailDto } from './product-detail.dto';
import { SoldProductDetailDto } from './sold-product-detail.dto';

export class ResponseCreatePurchaseDto {
  @ApiProperty({ type: ProductDetailDto })
  detail: ProductDetailDto;
  @ApiProperty({ type: [SoldProductDetailDto] })
  products: SoldProductDetailDto[];
}
