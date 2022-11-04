import { IsOptional, IsString, IsInt } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ListParametersDto {
  @ApiProperty({ type: 'string', example: 'search string', required: false })
  @IsString()
  @IsOptional()
  q?: string;

  @ApiProperty({
    type: 'string',
    example: 'object.key|columnName',
    description: 'use "-" at the beginning to sort by descending order',
    required: false,
  })
  @IsString()
  @IsOptional()
  sort?: string;

  @ApiProperty({
    type: 'number',
    example: 0,
    required: false,
  })
  @IsInt()
  @IsOptional()
  @Transform(({ value }) => Number.parseInt(value, 10))
  offset?: number;

  @ApiProperty({
    type: 'number',
    example: 10,
    required: false,
  })
  @IsInt()
  @IsOptional()
  @Transform(({ value }) => Number.parseInt(value, 10))
  limit?: number;
}
