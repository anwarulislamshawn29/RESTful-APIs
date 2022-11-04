import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class MetaDto {
  @ApiProperty({
    type: 'string',
    example: 'search string',
    required: false,
    readOnly: true,
  })
  @IsOptional()
  term?: string;

  @ApiProperty({
    type: 'string',
    example: 'object.key | ColumnNName',
    description: 'the column name or object key based on which sorting is done',
    required: false,
    readOnly: true,
  })
  @IsOptional()
  sort?: string;
}
