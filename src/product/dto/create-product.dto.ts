import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsDefined, IsEnum } from 'class-validator';
import { PrefixProductCode } from '../enum/prefix-product-code.enum';
import { ProductDto } from './product.dto';

export class CreateProductDto extends OmitType(ProductDto, ['code']) {
  @ApiProperty({
    type: String,
    example: PrefixProductCode.BD,
    description: 'Product prefix code.',
  })
  @IsDefined()
  @IsEnum(PrefixProductCode)
  codePrefix: string;
}
