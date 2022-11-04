import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { MetaDto } from './meta.dto';

export class PaginationDto extends PartialType(MetaDto) {
  @ApiProperty({ type: 'number', example: 10 })
  @IsNumber()
  offset: number;

  @ApiProperty({ type: 'number', example: 10 })
  @IsNumber()
  limit: number;

  @ApiProperty({ type: 'number', example: 0, nullable: true })
  @IsNumber()
  previousOffset?: number;

  @ApiProperty({ type: 'number', example: 20, nullable: true })
  @IsNumber()
  nextOffset?: number;

  @ApiProperty({ type: 'number', example: 1 })
  @IsNumber()
  currentPage: number;

  @ApiProperty({ type: 'number', example: 5 })
  @IsNumber()
  pageCount: number;

  @ApiProperty({ type: 'number', example: 50 })
  @IsNumber()
  total: number;
}
